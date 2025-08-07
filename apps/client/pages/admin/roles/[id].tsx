import { Permission, PERMISSIONS_CONFIG } from "@/shadcn/lib/types/permissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { Input } from "@/shadcn/ui/input";
import { getCookie } from "cookies-next";
import { Search } from "lucide-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UpdateRole() {
  const [step, setStep] = useState(1);
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>([]);
  const [roleName, setRoleName] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [users, setUsers] = useState<Array<{ id: string; email: string }>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  // New function to fetch role data
  const fetchRoleData = async () => {
    if (!id) return;

    try {
      const response = await fetch(`/api/v1/role/${id}`, {
        headers: {
          Authorization: `Bearer ${getCookie("session")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setRoleName(data.role.name);
        setSelectedPermissions(data.role.permissions);
        setSelectedUsers(data.role.users.map((u: any) => u.id));
      }
    } catch (error) {
      console.error("Error fetching role:", error);
    }
  };

  // Add this function
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/v1/users/all', {
        headers: {
          Authorization: `Bearer ${getCookie("session")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
    setIsLoading(false);
  };

  // Modified to handle role update instead of creation
  const handleUpdateRole = async () => {
    if (!roleName || !id) return;

    await fetch(`/api/v1/role/${id}/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getCookie("session")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: roleName,
        permissions: selectedPermissions,
        users: selectedUsers,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          router.push("/admin/roles");
        }
      });
  };

  // Load role data when component mounts
  useEffect(() => {
    if (id) {
      fetchRoleData();
      fetchUsers();
    }
  }, [id]);

  const handleSelectCategory = (category: string, isSelected: boolean) => {
    const categoryPermissions =
      PERMISSIONS_CONFIG.find((group) => group.category === category)
        ?.permissions || [];

    if (isSelected) {
      const newPermissions = [
        ...selectedPermissions,
        ...categoryPermissions.filter(
          (p: Permission) => !selectedPermissions.includes(p)
        ),
      ];
      setSelectedPermissions(newPermissions);
    } else {
      setSelectedPermissions(
        selectedPermissions.filter(
          //@ts-ignore
          (p: Permission) => !categoryPermissions.includes(p)
        )
      );
    }
  };

  const isCategoryFullySelected = (category: string) => {
    const categoryPermissions =
      PERMISSIONS_CONFIG.find((group) => group.category === category)
        ?.permissions || [];
    return categoryPermissions.every((p) => selectedPermissions.includes(p));
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">

      {step === 1 ? (
        <Card>
          <CardHeader>
            <div className="flex flex-row justify-between items-center">
              <Input
                placeholder="Role Name"
                value={roleName}
                className="w-1/4"
                onChange={(e) => setRoleName(e.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={() => setStep(2)}
                disabled={!roleName}
              >
                Next
              </button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Select Permissions</h3>
              {PERMISSIONS_CONFIG.map((group) => (
                <div key={group.category} className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-medium">{group.category}</h4>
                    <label className="flex items-center space-x-2 text-sm text-gray-600">
                      <input
                        type="checkbox"
                        checked={isCategoryFullySelected(group.category)}
                        onChange={(e) =>
                          handleSelectCategory(group.category, e.target.checked)
                        }
                        className="rounded"
                      />
                      <span>Select All</span>
                    </label>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {group.permissions.map((permission) => (
                      <label
                        key={permission}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          checked={selectedPermissions.includes(permission)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedPermissions([
                                ...selectedPermissions,
                                permission,
                              ]);
                            } else {
                              setSelectedPermissions(
                                selectedPermissions.filter(
                                  (p) => p !== permission
                                )
                              );
                            }
                          }}
                        />
                        <span>{permission}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <div className="flex flex-row justify-between items-center">
              <CardTitle>Select Users</CardTitle>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                  onClick={() => setStep(1)}
                >
                  Back
                </button>
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={handleUpdateRole}
                  disabled={isLoading}
                >
                  Update Role
                </button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="relative mb-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search users..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {isLoading ? (
                <div className="text-center py-4">Loading users...</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {filteredUsers.map((user) => (
                    <label
                      key={user.id}
                      className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50"
                    >
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsers([...selectedUsers, user.id]);
                          } else {
                            setSelectedUsers(
                              selectedUsers.filter((id) => id !== user.id)
                            );
                          }
                        }}
                        className="rounded"
                      />
                      <span className="flex-1">{user.email}</span>
                    </label>
                  ))}
                </div>
              )}

              {!isLoading && filteredUsers.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  {searchTerm ? "No users found" : "No users available"}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
