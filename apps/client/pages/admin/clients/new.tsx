import { notifications } from "@mantine/notifications";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateClientPage() {
  const router = useRouter();

  const token = getCookie("session");

  const [number, setNumber] = useState("");
  const [contactName, setContactName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const isEnabled =
    number.length > 0 &&
    contactName.length > 0 &&
    name.length > 0 &&
    email.length > 0;

  async function createClient() {
    await fetch(`/api/v1/client/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        number,
        contactName,
        name,
        email,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success === true) {
          notifications.show({
            title: "User created sucessfully",
            message: "The action was processed correctly! 💚",
            color: "green",
          });
          router.push("/admin/clients");
        } else {
          console.log("helo");
          notifications.show({
            title: "There has been an error ",
            message: "Whoops! please wait and try again! 🤥",
            color: "red",
          });
        }
      });
  }

  return (
    <div>
      <main className="flex-1">
        <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
          <div className="pt-10 pb-16 divide-y-2">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-gray-900  dark:text-white">
                Register a new client
              </h1>
            </div>
            <div className="py-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                        Create a new client
                      </h3>
                      <h3 className="text-xs font-normal text-gray-900  dark:text-white">
                        All fields are required!
                      </h3>
                      <div className="mt-2 space-y-4">
                        <input
                          type="text"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-3/4 sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter client name here..."
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                        />

                        <input
                          type="email"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter email here...."
                          onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                          type="text"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter client primary contact name here..."
                          onChange={(e) => setContactName(e.target.value)}
                        />

                        <input
                          type="text"
                          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter client primary contact number here..."
                          onChange={(e) => setNumber(e.target.value)}
                        />
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
                    createClient();
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
