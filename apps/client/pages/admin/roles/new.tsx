import { Permission, PERMISSIONS_CONFIG } from "@/shadcn/lib/types/permissions";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { getCookie } from "cookies-next";
import { useState } from "react";

export default function Roles() {
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );
  const [roleName, setRoleName] = useState("");

  const handleAddRole = async () => {
    if (!roleName) return;

    await fetch("/api/v1/roles", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getCookie("session")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: roleName,
        permissions: selectedPermissions,
      }),
    });

    setSelectedPermissions([]);
    setRoleName("");
  };

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
          // @ts-ignore
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

  console.log(selectedPermissions);

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Role name"
            className="px-2 py-2 border rounded"
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={handleAddRole}
          >
            Add Role
          </button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Roles</CardTitle>
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
    </div>
  );
}
