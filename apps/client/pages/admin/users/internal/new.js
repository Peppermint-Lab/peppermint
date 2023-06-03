import React, { useState, Fragment } from "react";
import { useRouter } from "next/router";
import { notifications } from '@mantine/notifications';

export default function CreateUser() {
  const [open, setOpen] = useState(false);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [admin, setAdmin] = useState(false);

  const router = useRouter();

  async function createUser() {
    await fetch("/api/v1/admin/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
        name,
        admin,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.sucess === true) {
          router.push("/admin/internal/users");
          notifications.show({
            title: "User created sucessfully",
            message: "The action was processed correctly! 💚",
          });
        } else {
          notifications.show({
            title: "There has been an error ",
            message: "Whoops! please wait and try again! 🤥",
            color: 'red'
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
      <div className="sm:flex sm:items-start">
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
          <h3 p className="text-lg leading-6 font-medium text-gray-900">
            Create a new user
          </h3>
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
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter password here..."
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="text-base font-medium text-gray-900 mt-2">
              User Type
            </label>
            <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
              {notificationMethods.map((notificationMethod) => (
                <div key={notificationMethod.id} className="flex items-center">
                  <input
                    id={notificationMethod.id}
                    name="notification-method"
                    type="radio"
                    defaultChecked={notificationMethod.id === "user"}
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
  );
}
