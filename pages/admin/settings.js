import { useState } from "react";
import { Switch } from "@headlessui/react";

import Webhooks from "../../components/Webhooks";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Settings() {
  const [show, setShow] = useState("webhooks");
  const tabs = [
    { name: "webhooks", current: show === "webhooks" ? true : false },
    { name: "notifications", current: show === "notifications" ? true : false },
  ];

  const [emails, setEmails] = useState(false);
  const [discord, setDiscord] = useState(false);
  const [telegram, setTelegram] = useState(false);
  const [slack, setSlack] = useState(false);

  console.log(discord);

  return (
    <div>
      <main className="flex-1">
        <div className="relative max-w-4xl mx-auto md:px-8 xl:px-0">
          <div className="pt-10 pb-16">
            <div className="px-4 sm:px-6 md:px-0">
              <h1 className="text-3xl font-extrabold text-gray-900">
                Admin Settings
              </h1>
            </div>
            <div className="px-4 sm:px-6 md:px-0">
              <div className="py-6">
                <div className="lg:hidden">
                  <label htmlFor="selected-tab" className="sr-only">
                    Select a tab
                  </label>
                  <select
                    id="selected-tab"
                    name="selected-tab"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                    defaultValue={tabs.find((tab) => tab.current).name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className="hidden lg:block">
                  <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8">
                      {tabs.map((tab) => (
                        <button
                          key={tab.name}
                          onClick={() => setShow(tab.name)}
                          className={classNames(
                            tab.current
                              ? "border-purple-500 text-purple-600"
                              : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                            "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                          )}
                        >
                          {tab.name}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>

                <div className="mt-10">
                  <div className={show === "webhooks" ? "" : "hidden"}>
                    <Webhooks />
                  </div>

                  <div className={show === "notifications" ? "" : "hidden"}>
                    <div className="space-y-4">
                      <Switch.Group
                        as="div"
                        className="flex items-center justify-between"
                      >
                        <span className="flex-grow flex flex-col">
                          <Switch.Label
                            as="span"
                            className="text-sm font-medium text-gray-900"
                            passive
                          >
                            Email notifications
                          </Switch.Label>
                          <Switch.Description
                            as="span"
                            className="text-sm text-gray-500"
                          >
                            Get notified when a handful events run, can be
                            individually turned off by a user.
                          </Switch.Description>
                        </span>
                        <Switch
                          checked={emails}
                          onChange={setEmails}
                          className={classNames(
                            emails ? "bg-indigo-600" : "bg-gray-200",
                            "mr-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              emails ? "translate-x-5" : "translate-x-0",
                              "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                            )}
                          />
                        </Switch>
                        {emails && (
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
                        )}
                      </Switch.Group>

                      <Switch.Group
                        as="div"
                        className="flex items-center justify-between"
                      >
                        <span className="flex-grow flex flex-col">
                          <Switch.Label
                            as="span"
                            className="text-sm font-medium text-gray-900"
                            passive
                          >
                            Discord notifications
                          </Switch.Label>
                          <Switch.Description
                            as="span"
                            className="text-sm text-gray-500"
                          >
                            Use discord webhooks to get sent an update everytime
                            a new ticket is created.
                          </Switch.Description>
                        </span>
                        <Switch
                          checked={discord}
                          onChange={setDiscord}
                          className={classNames(
                            discord ? "bg-indigo-600" : "bg-gray-200",
                            "mr-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              discord ? "translate-x-5" : "translate-x-0",
                              "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                            )}
                          />
                        </Switch>
                        {discord && (
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
                        )}
                      </Switch.Group>

                      <Switch.Group
                        as="div"
                        className="flex items-center justify-between"
                      >
                        <span className="flex-grow flex flex-col">
                          <Switch.Label
                            as="span"
                            className="text-sm font-medium text-gray-900"
                            passive
                          >
                            Telegram notifications
                          </Switch.Label>
                          <Switch.Description
                            as="span"
                            className="text-sm text-gray-500"
                          >
                            Use telegram webhooks to get sent an update
                            everytime a new ticket is created.
                          </Switch.Description>
                        </span>
                        <Switch
                          checked={telegram}
                          onChange={setTelegram}
                          className={classNames(
                            telegram ? "bg-indigo-600" : "bg-gray-200",
                            "mr-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              telegram ? "translate-x-5" : "translate-x-0",
                              "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                            )}
                          />
                        </Switch>
                        {telegram && (
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
                        )}
                      </Switch.Group>
                    </div>
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
