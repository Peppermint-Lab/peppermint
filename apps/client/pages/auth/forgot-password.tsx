import { notifications } from "@mantine/notifications";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Login({}) {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [view, setView] = useState("request");

  async function postData() {
    await fetch(`/api/v1/auth/password-reset`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, link: window.location.origin }),
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

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <a target="_blank" href="https://peppermint.sh/">
          <img
            className="mx-auto h-36 w-auto"
            src="/login.svg"
            alt="peppermint.sh logo"
          />
        </a>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Request Password Reset
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <Link
                  href="/auth/login"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Remember your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={postData}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Submit Request
              </button>
            </div>
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
