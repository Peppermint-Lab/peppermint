import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";

export default function EmailQueues() {
  const router = useRouter();

  const [name, setName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [hostname, setHostname] = useState();
  const [tls, setTls] = useState();

  async function newQueue() {
    await fetch(`/api/v1/email-queue/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("session"),
      },
      body: JSON.stringify({
        name,
        username,
        password,
        hostname,
        tls,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        router.back("/admin/email-queues");
      });
  }

  return (
    <div>
      <main className="flex-1">
        <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
          <div className="pt-10 pb-16 divide-y-2">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-gray-900  dark:text-white">
                New Email Queue
              </h1>
            </div>
            <div className="">
              <div className="mt-4">
                <div className="space-y-4 flex  justify-center flex-col w-full">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      Queue name
                    </label>
                    <input
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-1/2 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter first name here..."
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      Username (email)
                    </label>
                    <input
                      type="email"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-1/2  sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter first name here..."
                      name="name"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-1/2  sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter first name here..."
                      name="name"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      Hostname
                    </label>
                    <input
                      type="text"
                      className="shadow-sm w-1/2  focus:ring-indigo-500 focus:border-indigo-500 block  sm:text-sm border-gray-300 rounded-md"
                      placeholder="Enter first name here..."
                      name="name"
                      onChange={(e) => setHostname(e.target.value)}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900  dark:text-white"
                    >
                      TLS
                    </label>
                    <select
                      id="location"
                      name="location"
                      className="mt-2 block w-1/2 rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      defaultValue="True"
                      onChange={(e) => setTls(e.target.value)}
                    >
                      <option>True</option>
                      <option>False</option>
                    </select>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      newQueue();
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
