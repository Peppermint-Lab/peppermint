import { toast } from "@/shadcn/hooks/use-toast";
import { hasAccess } from "@/shadcn/lib/hasAccess";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Roles() {
  const [roles, setRoles] = useState([]);
  const [isAllRolesActive, setIsAllRolesActive] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchRoles = async () => {
    const response = await fetch("/api/v1/roles/all", {
      headers: {
        Authorization: `Bearer ${getCookie("session")}`,
      },
    });
    hasAccess(response);

    if (hasAccess(response)) {
      const data = await response.json();
      setRoles(data.roles);
      setIsAllRolesActive(data.roles_active.roles_active);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const handleDeleteRole = async (roleId) => {
    if (!confirm("Are you sure you want to delete this role?")) return;

    await fetch(`/api/v1/role/${roleId}/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getCookie("session")}`,
      },
    });

    fetchRoles();
  };

  const handleToggleRole = async (roleId: string, isActive: boolean) => {
    await fetch(`/api/v1/role/${roleId}/toggle`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getCookie("session")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive: !isActive }),
    });

    fetchRoles();
  };

  const handleToggleAllRoles = async (isActive: boolean) => {
    await fetch(`/api/v1/config/toggle-roles`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getCookie("session")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isActive }),
    });

    toast({
      title: "Role Status Updated!",
      description: "Roles have been updated successfully.",
    });

    fetchRoles();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => {
              router.push("/admin/roles/new");
            }}
          >
            Add Role
          </button>
          <button
            className="px-4 py-2 bg-yellow-500 text-white rounded"
            onClick={() => handleToggleAllRoles(false)}
          >
            Disable All Roles
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleToggleAllRoles(true)}
          >
            Enable All Roles
          </button>
        </div>
      </div>
      {!loading && (
        <Card>
          <CardHeader>
            <CardTitle>Roles</CardTitle>
            <span
              className={`px-2 py-0.5 text-xs rounded ${
                isAllRolesActive
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {isAllRolesActive ? "Active" : "Inactive"}
            </span>
          </CardHeader>
          <CardContent>
            {roles.length === 0 ? (
              <div>No roles available</div>
            ) : (
              <ul>
                {roles.map((role) => (
                  <li key={role.id} className="border-b py-2">
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <strong>{role.name}</strong>
                        </div>
                        <span className="text-xs text-gray-500">
                          ID: {role.id}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        {/* <button
                        className={`px-3 py-1 text-white rounded text-sm ${role.isActive ? 'bg-yellow-500' : 'bg-green-500'}`}
                        onClick={() => handleToggleRole(role.id, role.isActive)}
                      >
                        {role.isActive ? 'Deactivate' : 'Activate'}
                      </button> */}
                        <button
                          className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                          onClick={() => router.push(`/admin/roles/${role.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                          onClick={() => {
                            if (
                              window.confirm(
                                "Are you sure you want to delete this role?"
                              )
                            ) {
                              handleDeleteRole(role.id);
                            }
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
