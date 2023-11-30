import { getCookie } from "cookies-next";
import { useState } from "react";
import { useQuery } from "react-query";

async function getHooks() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/webhooks/all`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("session")}`,
      },
    }
  );
  return res.json();
}

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Notifications() {
  const [show, setShow] = useState("main");
  const [enabled, setEnabled] = useState(true);
  const [url, setUrl] = useState("");
  const [type, setType] = useState("ticket_created");
  const [secret, setSecret] = useState();
  const [name, setName] = useState("");

  const { data, status, error, refetch } = useQuery("gethooks", getHooks);

  async function addHook() {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/webhook/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("session")}`,
      },
      body: JSON.stringify({
        name,
        active: enabled,
        url,
        type,
        secret,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        refetch();
      });
  }

  async function deleteHook(id) {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/admin/webhook/${id}/delete`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("session")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        refetch();
        if (res.error) {
          alert(res.error);
        }
      });
  }

  return (
    <main className="flex-1">
      <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
        <div className="pt-10 pb-16 ">
          <div className="divide-y-2">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-gray-900">
                Outbound Email Settings
              </h1>
            </div>
            <div className="px-4 sm:px-6 md:px-0">
              <div className="sm:flex sm:items-center mt-4">
                <div className="sm:flex-auto">
                  <p className="mt-2 text-sm text-gray-700">
                    Manage your outbound email settings. This is the mailbox
                    that will send all outbound emails. To either clients or
                    internal users for Notifications.
                  </p>
                </div>
                <div className="sm:ml-16 sm:flex-none">
                  <>
                    <button
                      onClick={() => setShow("create")}
                      type="button"
                      className={
                        show === "main"
                          ? "rounded bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          : "hidden"
                      }
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setShow("main")}
                      type="button"
                      className={
                        show === "main"
                          ? "hidden"
                          : "rounded bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                      }
                    >
                      Cancel
                    </button>
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 sm:px-6 md:px-0">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company_website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      SMTP Host
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="company_website"
                        id="company_website"
                        className="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company_website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      SMTP Port
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="company_website"
                        id="company_website"
                        className="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 rounded-md sm:text-sm border-gray-300"
                        placeholder="587"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company_website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      SMTP Username
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="company_website"
                        id="company_website"
                        className="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 rounded-md sm:text-sm border"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company_website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      SMTP Username
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="company_website"
                        id="company_website"
                        className="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 rounded-md sm:text-sm border"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company_website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      reply-to
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="company_website"
                        id="company_website"
                        className="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 rounded-md sm:text-sm border"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company_website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      port
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="company_website"
                        id="company_website"
                        className="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 rounded-md sm:text-sm border"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
