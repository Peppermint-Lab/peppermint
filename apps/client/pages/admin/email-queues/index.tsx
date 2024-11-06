import { getCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EmailQueues() {
  const [queues, setQueues] = useState();

  async function fetchQueues() {
    const res = await fetch(`/api/v1/email-queues/all`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("session"),
      },
    }).then((res) => res.json());
    setQueues(res.queues);
  }

  async function deleteItem(id) {
    await fetch(`/api/v1/email-queue/delete`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + getCookie("session"),
      },
      body: JSON.stringify({
        id,
      }),
    })
      .then((res) => res.json())
      .then(() => fetchQueues());
  }

  useEffect(() => {
    fetchQueues();
  }, []);

  return (
    <div>
      <main className="flex-1">
        <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
          <div className="pt-10 pb-16 divide-y-2">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-gray-900  dark:text-white">
                Email Queues
              </h1>
            </div>
            <div className="px-4 sm:px-6 md:px-0">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto mt-4">
                  <p className="mt-2 text-sm text-gray-700  dark:text-white">
                    A list of the mailboxes you are listening to, these will
                    automatically create tickets and can be accessed down the
                    side navigation.
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <Link
                    href="/admin/email-queues/new"
                    className="rounded bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    New Queue
                  </Link>
                </div>
              </div>
              <div className="-mx-4 mt-8 sm:-mx-0">
                {queues !== undefined && queues.length > 0 && (
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                        >
                          Email/Username
                        </th>
                        <th
                          scope="col"
                          className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                        >
                          Hostname
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Port
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {queues.map((item) => (
                        <tr key={item.id}>
                          <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                            {item.name}
                            <dl className="font-normal lg:hidden">
                              <dt className="sr-only">Title</dt>
                              <dd className="mt-1 truncate text-gray-700">
                                {item.username}
                              </dd>
                              <dt className="sr-only sm:hidden">Email</dt>
                              <dd className="mt-1 truncate  sm:hidden">
                                {item.hostname}
                              </dd>
                            </dl>
                          </td>
                          <td className="hidden px-3 py-4 text-sm  lg:table-cell">
                            {item.username}
                          </td>
                          <td className="hidden px-3 py-4 text-sm  sm:table-cell">
                            {item.hostname}
                          </td>
                          <td className="px-3 py-4 text-sm ">
                            {item.tls ? "993" : "110"}
                          </td>
                          <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <button
                              type="button"
                              onClick={() => deleteItem(item.id)}
                              className="rounded bg-red-600 py-1 px-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
