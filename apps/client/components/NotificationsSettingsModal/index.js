import React, { useState, useEffect, Fragment, useRef } from "react";
import { Dialog, Transition, Listbox } from "@headlessui/react";
import { XIcon } from "@heroicons/react/solid";
import useTranslation from "next-translate/useTranslation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NotificationsSettingsModal() {
  const { t, lang } = useTranslation("peppermint");

  const [open, setOpen] = useState(false);

  const [host, setHost] = useState();
  const [reply, setReply] = useState();
  const [port, setPort] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  async function postData() {
    await fetch("/api/v1/admin/notifications/emails/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        host: host,
        reply: reply,
        port: port,
        username: username,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }

  const cancelButtonRef = useRef(null);

  return (
    <div>
      <>
        <button onClick={() => setOpen(true)} type="button" className="mt-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </button>
      </>

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed z-10 inset-0"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
                <div className="flex flex-row w-full border-b border-gray-300">
                  <span className="text-md pb-2 font-bold">Email Settings</span>

                  <button
                    type="button"
                    className="ml-auto mb-1.5 bg-white text-xs rounded-md text-gray-400 hover:text-gray-500 "
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <div className="space-y-1 mt-4 mb-4">
                  <label
                    htmlFor="smtp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    SMTP Host
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="smtp"
                      id="smtp"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder=""
                      onChange={(e) => setHost(e.target.value)}
                    />
                  </div>
                  <label
                    htmlFor="reply"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Reply From
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="reply"
                      id="reply"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="noreply@peppermint.sh"
                      onChange={(e) => setReply(e.target.value)}
                    />
                  </div>
                  <label
                    htmlFor="port"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Port
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="port"
                      id="port"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder="403"
                      onChange={(e) => setPort(e.target.value)}
                    />
                  </div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder=""
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      type="password"
                      name="password"
                      id="password"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      placeholder=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <div className="border-t border-gray-300 ">
                    <div className="mt-2 float-right">
                      <button
                        onClick={() => {
                          postData();
                        }}
                        type="button"
                        className="inline-flex justify-center rounded-md shadow-sm px-2.5 py-1.5 border border-transparent text-xs bg-green-600 font-medium text-white hover:bg-green-700 focus:outline-none "
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}
