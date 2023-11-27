import { notifications } from "@mantine/notifications";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function CreateUser() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState(false);

  const router = useRouter();

  async function createUser() {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + getCookie("session"),
        },
        body: JSON.stringify({
          password,
          email,
          name,
          admin,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          router.push("/admin/users");
          notifications.show({
            title: "User created successfully",
            message: "The action was processed correctly! 💚",
          });
        } else {
          notifications.show({
            title: "There has been an error ",
            message: "Whoops! please wait and try again! 🤥",
            color: "red",
          });
        }
      });
  }

  const notificationMethods = [
    { id: "user", title: "user" },
    { id: "admin", title: "admin" },
  ];

  return (
    <div>
      <main className="flex-1">
        <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
          <div className="pt-10 pb-16 divide-y-2">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-gray-900">
                Add a new user
              </h1>
            </div>
            <div className="px-4 sm:px-6 md:px-0">
              <div className="py-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <div className="mt-2 space-y-4">
                      <input
                        type="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-1/2 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter first name here..."
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                      />

                      <input
                        type="text"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter email here...."
                        onChange={(e) => setEmail(e.target.value)}
                      />

                      <input
                        type="password"
                        className="shadow-sm mb-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                        placeholder="Enter password here..."
                        onChange={(e) => setPassword(e.target.value)}
                      />

                      <div className="mt-6">
                        <label className="text-base font-medium text-gray-900 ">
                          User Type
                        </label>
                        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                          {notificationMethods.map((notificationMethod) => (
                            <div
                              key={notificationMethod.id}
                              className="flex items-center"
                            >
                              <input
                                id={notificationMethod.id}
                                name="notification-method"
                                type="radio"
                                defaultChecked={
                                  notificationMethod.id === "user"
                                }
                                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                value={notificationMethod.id}
                                onChange={(e) =>
                                  e.target.value === "admin"
                                    ? setAdmin(true)
                                    : setAdmin(false)
                                }
                              />
                              <label
                                htmlFor={notificationMethod.id}
                                className="ml-3 block text-sm font-medium text-gray-700"
                              >
                                {notificationMethod.title}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      createUser();
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
