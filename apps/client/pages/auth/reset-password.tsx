import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login({}) {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState("code");

  async function sendCode() {
    await fetch(`/api/v1/auth/password-reset/code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, uuid: router.query.token }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          notifications.show({
            title: "Success",
            message: "A password reset email is on its way.",
            color: "green",
            autoClose: 5000,
          });
          setView("password");
        } else {
          notifications.show({
            title: "Error",
            message:
              "There was an error with this request, please try again. If this issue persists, please contact support via the discord.",
            color: "red",
            autoClose: 5000,
          });
        }
      });
  }

  async function updatPassword() {
    if (password.length < 1) {
      notifications.show({
        title: "Error",
        message: "Password cannot be empty.",
        color: "red",
        autoClose: 5000,
      });
    } else {
      await fetch(`/api/v1/auth/password-reset/password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, password }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            notifications.show({
              title: "Success",
              message: "Password updated successfully.",
              color: "green",
              autoClose: 5000,
            });
            router.push("/auth/login");
          } else {
            notifications.show({
              title: "Error",
              message:
                "There was an error with this request, please try again. If this issue persists, please contact support via the discord.",
              color: "red",
              autoClose: 5000,
            });
          }
        });
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Reset Password
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            {view === "code" ? (
              <>
                <div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Code
                  </label>
                  <div className="mt-1">
                    <input
                      id="text"
                      name="text"
                      type="text"
                      autoComplete="off"
                      required
                      onChange={(e) => setCode(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    onClick={sendCode}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Check Code
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label
                    htmlFor="text"
                    className="block text-sm font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="text"
                      name="text"
                      type="password"
                      autoComplete="off"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    onClick={updatPassword}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Change Password
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 text-center flex flex-col space-y-2">
          <span className="font-bold">Built with 💚 by Peppermint Labs</span>
          <a href="https://docs.peppermint.sh/" target="_blank">
            Documentation
          </a>
        </div>
      </div>
    </div>
  );
}
