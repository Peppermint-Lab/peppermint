import { Combobox, Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import {
  DocumentPlusIcon,
  FolderIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useUser } from "../../../store/session";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function GlobalShortcut() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [tickets, setTickets] = useState([]);

  const { user } = useUser();

  const quickActions = [
    {
      name: "All Tickets",
      icon: DocumentPlusIcon,
      shortcut: () => router.push("/tickets"),
      url: "/tickets",
    },
    {
      name: `${user.name}'s open tickets`,
      icon: DocumentPlusIcon,
      shortcut: () => router.push("/tickets/open"),
      url: "/tickets",
    },
    {
      name: `${user.name}'s closed tickets`,
      icon: DocumentPlusIcon,
      shortcut: () => router.push("/tickets/closed"),
      url: "/tickets",
    },
    {
      name: `Notes`,
      icon: DocumentPlusIcon,
      shortcut: () => router.push("/notebook"),
      url: "/tickets",
    },
    {
      name: `New Note`,
      icon: DocumentPlusIcon,
      shortcut: () => router.push("/notebook/new"),
      url: "/tickets",
    },
  ];

  async function GlobalTicketSearch() {
    const res = await fetch(`/api/v1/tickets/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("session")}`,
      },
      body: JSON.stringify({ query }),
    }).then((res) => res.json());

    console.log(res);

    if (res.success) {
      setTickets(res.tickets);
    }
  }

  useEffect(() => {
    if (query.length !== 0 && query !== "") {
      GlobalTicketSearch();
    }
  }, [query]);

  function handleRouting(id) {
    setQuery("");
    setOpen(false);
    router.push(`/ticket/${id}`);
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Transition.Root
        show={open}
        as={Fragment}
        afterLeave={() => setQuery("")}
        appear
      >
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-gray-500 divide-opacity-20 overflow-hidden rounded-xl bg-gray-900 shadow-2xl transition-all">
                <Combobox>
                  <div className="relative">
                    <MagnifyingGlassIcon
                      className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                    <Combobox.Input
                      className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-white focus:ring-0 sm:text-sm"
                      placeholder="Search Tickets..."
                      onChange={(event) => setQuery(event.target.value)}
                    />
                  </div>

                  {(query === "" || tickets.length > 0) && (
                    <Combobox.Options
                      static
                      className="max-h-80 scroll-py-2 divide-y divide-gray-500 divide-opacity-20 overflow-y-auto"
                    >
                      {/* <li className="p-2">
                        {query === "" && (
                          <h2 className="mb-2 mt-4 px-3 text-xs font-semibold text-gray-200">
                            Recent searches
                          </h2>
                        )}
                        <ul className="text-sm text-gray-400">
                          {(query === "" ? recent : tickets).map((project) => (
                            <Combobox.Option
                              key={project.id}
                              value={project}
                              className={({ active }) =>
                                classNames(
                                  "flex cursor-default select-none items-center rounded-md px-3 py-2",
                                  active && "bg-gray-800 text-white"
                                )
                              }
                            >
                              {({ active }) => (
                                <>
                                  <FolderIcon
                                    className={classNames(
                                      "h-6 w-6 flex-none",
                                      active ? "text-white" : "text-gray-500"
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span className="ml-3 flex-auto truncate">
                                    {project.name}
                                  </span>
                                  {active && (
                                    <span className="ml-3 flex-none text-gray-400">
                                      Jump to...
                                    </span>
                                  )}
                                </>
                              )}
                            </Combobox.Option>
                          ))}
                        </ul>
                      </li> */}
                      {query === "" && (
                        <li className="p-2">
                          <h2 className="sr-only">Quick actions</h2>
                          <ul className="text-sm text-gray-400">
                            {quickActions.map((action) => (
                              <Combobox.Option
                                key={action.name}
                                value={action}
                                onClick={() => {
                                  action.shortcut();
                                  setOpen(false);
                                }}
                                onKeyDown={(event) => {
                                  if (event.key === "Enter") {
                                    event.preventDefault(); // Prevent default action for the Enter key
                                    action.shortcut();
                                  }
                                }}
                                className={({ active }) =>
                                  classNames(
                                    "flex cursor-default select-none items-center rounded-md px-3 py-2 hover:cursor-pointer",
                                    active && "bg-gray-800 text-white "
                                  )
                                }
                              >
                                {({ active }) => (
                                  <div className="flex flex-row space-x-2 items-center hover:cursor-pointer">
                                    <action.icon
                                      className={classNames(
                                        "h-6 w-6 flex-none",
                                        active ? "text-white" : "text-gray-500"
                                      )}
                                      aria-hidden="true"
                                    />
                                    <span className="ml-3 flex-auto truncate">
                                      {action.name}
                                    </span>
                                  </div>
                                )}
                              </Combobox.Option>
                            ))}
                          </ul>
                        </li>
                      )}
                    </Combobox.Options>
                  )}

                  {query !== "" && tickets.length === 0 && (
                    <div className="px-6 py-14 text-center sm:px-14">
                      <FolderIcon
                        className="mx-auto h-6 w-6 text-gray-500"
                        aria-hidden="true"
                      />
                      <p className="mt-4 text-sm text-gray-200">
                        We couldn't find any projects with that term. Please try
                        again.
                      </p>
                    </div>
                  )}

                  {query !== "" && tickets.length > 0 && (
                    <div className="p-2">
                      <Combobox.Options
                        static
                        className="max-h-80 scroll-py-2  divide-opacity-20 overflow-y-auto"
                      >
                        {tickets.map((ticket) => (
                          <Combobox.Option
                            key={ticket.id}
                            value={ticket}
                            onClick={() => handleRouting(ticket.id)}
                            className={({ active }) =>
                              classNames(
                                "flex cursor-default select-none items-center rounded-md px-3 py-2 text-gray-500 capitalize",
                                active &&
                                  "bg-gray-800 text-white hover:cursor-pointer"
                              )
                            }
                          >
                            {({ active }) => (
                              <>
                                <FolderIcon
                                  className={classNames(
                                    "h-6 w-6 flex-none",
                                    active ? "text-white" : "text-gray-500"
                                  )}
                                  aria-hidden="true"
                                />
                                <span className="ml-3 flex-auto truncate">
                                  {ticket.title}
                                </span>
                                {active && (
                                  <span className="ml-3 flex-none text-gray-400">
                                    Jump to...
                                  </span>
                                )}
                              </>
                            )}
                          </Combobox.Option>
                        ))}
                      </Combobox.Options>
                    </div>
                  )}
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
