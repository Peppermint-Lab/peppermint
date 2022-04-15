import { useState } from "react";
import { Switch } from '@headlessui/react'

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

  const [emails, setEmails] = useState(true);

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
                            Get notified when a handful events run, can be individually turned off by a user.
                          </Switch.Description>
                        </span>
                        <Switch
                          checked={emails}
                          onChange={setEmails}
                          className={classNames(
                            emails ? "bg-indigo-600" : "bg-gray-200",
                            "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                            Use discord webhooks to get sent an update everytime a new ticket is created. 
                          </Switch.Description>
                        </span>
                        <Switch
                          checked={emails}
                          onChange={setEmails}
                          className={classNames(
                            emails ? "bg-indigo-600" : "bg-gray-200",
                            "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                            Use telegram webhooks to get sent an update everytime a new ticket is created. 
                          </Switch.Description>
                        </span>
                        <Switch
                          checked={emails}
                          onChange={setEmails}
                          className={classNames(
                            emails ? "bg-indigo-600" : "bg-gray-200",
                            "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
