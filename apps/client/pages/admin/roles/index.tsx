import { hasAccess } from "@/shadcn/lib/hasAccess";
import { Card, CardContent, CardHeader, CardTitle } from "@/shadcn/ui/card";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Roles() {
  const [roles, setRoles] = useState([]);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={() => {
            router.push("/admin/roles/new");
          }}
        >
          Add Role
        </button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Roles</CardTitle>
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
                      <strong>{role.name}</strong>
                      <span className="text-xs text-gray-500">
                        ID: {role.id}
                      </span>
                    </div>
                    <div className="flex gap-2">
                    <button
                      className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
                      onClick={() => router.push(`/admin/roles/${role.id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                      onClick={() => {
                        if (window.confirm("Are you sure you want to delete this role?")) {
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
    </div>
  );
}
