import React, { useState } from "react";
import { message } from "antd";
import { useSession, signOut } from "next-auth/react";

import UserProfile from "../components/UserProfile";

export default function Settings() {
  const { data: session } = useSession();

  const linkStyles = {
    active:
      "w-full bg-teal-50 border-teal-500 text-teal-700 hover:bg-teal-50 hover:text-teal-700 group border-l-4 px-3 py-2 flex items-center text-sm font-medium",
    inactive:
      "w-full border-transparent text-gray-900 hover:bg-gray-50 hover:text-gray-900 group mt-1 border-l-4 px-3 py-2 flex items-center text-sm font-medium",
  };

  const [showProfile, setShowProfile] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [check, setCheck] = useState("");

  const success = () => {
    message.success("Password updated");
  };

  const fail = (f) => {
    message.error(`${f}`);
  };

  const postData = async () => {
    const id = session.id;
    if (check === password) {
      await fetch(`/api/v1/users/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          id,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.failed === false) {
            success();
          } else {
            fail(res.message);
          }
        });
    } else {
      fail("Passwords are not the same");
    }
  };

  return (
    <div>
      <main className="relative">
        <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-8">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200 lg:grid lg:grid-cols-12 lg:divide-y-0 lg:divide-x">
              <aside className="py-6 lg:col-span-3">
                <nav>
                  <button
                    onClick={() => {
                      setShowProfile(true);
                      setShowPassword(false);
                    }}
                    className={
                      showProfile ? linkStyles.active : linkStyles.inactive
                    }
                    aria-current="page"
                  >
                    <svg
                      className="text-teal-500 group-hover:text-teal-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="truncate">Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setShowProfile(false);
                      setShowPassword(true);
                    }}
                    className={
                      showPassword ? linkStyles.active : linkStyles.inactive
                    }
                  >
                    <svg
                      className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                      />
                    </svg>
                    <span className="truncate">Password</span>
                  </button>
                  <button
                    onClick={() => signOut({redirect: true, callbackUrl: "/"})}
                    className={linkStyles.inactive}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span className="truncate">Log Out</span>
                  </button>
                </nav>
              </aside>
              <div className="divide-y divide-gray-200 lg:col-span-9">
                <div className={`${showProfile ? "" : "hidden"}`}>
                  <div>
                    <UserProfile />
                  </div>
                </div>
                <div className={`${showPassword ? "" : "hidden"}`}>
                  <div className="m-2 space-y-4 p-4">
                    <input
                      type="password"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter users new password"
                    />

                    <input
                      type="password"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      onChange={(e) => setCheck(e.target.value)}
                      placeholder="Confirm users password"
                    />
                    <button
                      type="button"
                      className=" float-right w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => postData()}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
