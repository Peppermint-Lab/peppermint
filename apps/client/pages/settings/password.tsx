import { useState } from "react";

import { getCookie } from "cookies-next";
import { toast } from "@/shadcn/hooks/use-toast";

export default function PasswordChange({ children }) {
  const token = getCookie("session");

  const [password, setPassword] = useState("");
  const [check, setCheck] = useState("");

  const postData = async () => {
    if (check === password && password.length > 2) {
      await fetch(`/api/v1/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          password,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            toast({
              variant: "default",
              title: "Success",
              description: "Password updated successfully.",
            });
          } else {
            toast({
              variant: "destructive",
              title: "Error",
              description: "Error: Failed to update password",
            });
          }
        });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error: passwords do not match",
      });
    }
  };

  return (
    <>
      <main className="py-2">
        <div className="mt-4">
          <div className="m-2 space-y-4 p-4">
            <input
              type="password"
              className="shadow-sm text-foreground bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter users new password"
            />

            <input
              type="password"
              className="shadow-sm text-foreground bg-transparent focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              onChange={(e) => setCheck(e.target.value)}
              placeholder="Confirm users password"
            />
          </div>
        </div>
        <div className="pb-2 px-4 flex justify-end sm:px-6">
          <button
            onClick={async () => {
              await postData();
            }}
            type="submit"
            className="inline-flex bg-primary items-center px-4 py-2 border font-semibold border-gray-300 shadow-sm text-xs rounded text-white"
          >
            Update Password
          </button>
        </div>
      </main>
    </>
  );
}
