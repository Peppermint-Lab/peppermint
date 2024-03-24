import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";
import { notifications } from "@mantine/notifications";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function Notifications() {
  const [loading, setLoading] = useState(true);
  const [enabled, setEnabled] = useState(false);
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [reply, setReply] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function updateEmailConfig() {
    await fetch(`/api/v1/config/email`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("session")}`,
      },
      body: JSON.stringify({
        host,
        active: enabled,
        port,
        reply,
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setLoading(true);
        fetchEmailConfig();
      });
  }

  async function deleteEmailConfig() {
    setLoading(true);
    await fetch(`/api/v1/config/email`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${getCookie("session")}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        setHost("");
        setPort("");
        setUsername("");
        setPassword("");
        setReply("");
        fetchEmailConfig();
      });
  }

  async function testEmailConfig() {
    // Send a test email to the reply address
    await fetch(`/api/v1/config/email/verify`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("session")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          notifications.show({
            title: "Email Config Test",
            message: "Email Config Test was successful",
            color: "teal",
          });
        } else {
          notifications.show({
            title: "Email Config Test",
            message: "Email Config Test failed",
            color: "red",
          });
        }
      });
  }

  async function fetchEmailConfig() {
    await fetch(`/api/v1/config/email`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("session")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.active) {
          setEnabled(res.email.active);
          setHost(res.email.host);
          setPort(res.email.port);
          setUsername(res.email.user);
          setReply(res.email.reply);
        } else {
          setEnabled(false);
        }
      })
      .then(() => setLoading(false));
  }

  useEffect(() => {
    fetchEmailConfig();
  }, []);

  return (
    <main className="flex-1">
      <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
        <div className="pt-10 pb-6">
          <div className="divide-y-2">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-gray-900  dark:text-white">
                Outbound Email Settings
              </h1>
            </div>
            <div className="px-4 sm:px-6 md:px-0">
              <div className="sm:flex sm:items-center mt-4">
                <div className="sm:flex-auto">
                  <p className="mt-2 text-sm text-gray-700  dark:text-white">
                    Manage your outbound email settings. This is the mailbox
                    that will send all outbound emails. To either clients or
                    internal users for Notifications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sm:flex-none mb-4">
          <div className="flex flex-row gap-x-4 justify-between">
            <div className="space-x-4">
              <button
                onClick={() => updateEmailConfig()}
                type="button"
                className="rounded bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Update Settings
              </button>
              {enabled && (
                <button
                  onClick={testEmailConfig}
                  type="button"
                  className="rounded bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Test Settings
                </button>
              )}
            </div>
            {enabled && (
              <button
                onClick={deleteEmailConfig}
                type="button"
                className="rounded bg-red-500 px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-red-400"
              >
                Delete Settings
              </button>
            )}
          </div>
        </div>
        {!loading && (
          <div className="px-4 sm:px-6 md:px-0">
            <div className="mb-6">
              {enabled ? (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <ExclamationTriangleIcon
                        className="h-5 w-5 text-green-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">
                        SMTP Config Found & working
                      </h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>The config you supplied is working as intended.</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-md bg-yellow-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <ExclamationTriangleIcon
                        className="h-5 w-5 text-yellow-400"
                        aria-hidden="true"
                      />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800">
                        No Active Email Settings found
                      </h3>
                      <div className="mt-2 text-sm text-yellow-700">
                        <p>
                          Please either create and submit an smtp config or
                          active your old one.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
                          value={host}
                          onChange={(e) => setHost(e.target.value)}
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
                          value={port}
                          onChange={(e) => setPort(e.target.value)}
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
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
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
                        SMTP Password
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="company_website"
                          id="company_website"
                          className="flex-1 focus:ring-green-500 focus:border-green-500 block w-full min-w-0 rounded-md sm:text-sm border"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
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
                          value={reply}
                          onChange={(e) => setReply(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
