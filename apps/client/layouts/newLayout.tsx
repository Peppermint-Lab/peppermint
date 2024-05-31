import {
  Combobox,
  Dialog,
  Disclosure,
  Menu,
  Transition,
} from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  Cog6ToothIcon,
  FolderIcon,
  HomeIcon,
  InboxStackIcon,
  MagnifyingGlassIcon,
  TicketIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

import { Button, ContextMenu } from "@radix-ui/themes";
import useTranslation from "next-translate/useTranslation";
import { useUser } from "../store/session";

const projects = [
  { id: 1, name: "Workflow Inc. / Website Redesign", url: "#" },
  // More projects...
];
const quickActions = [
  // { name: "Add new file...", icon: DocumentPlusIcon, shortcut: "N", url: "#" },
  // { name: "Add new folder...", icon: FolderPlusIcon, shortcut: "F", url: "#" },
  // { name: "Add hashtag...", icon: HashtagIcon, shortcut: "H", url: "#" },
  // { name: "Add label...", icon: TagIcon, shortcut: "L", url: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CommandModal() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [tickets, setTickets] = useState([]);

  function handleKeyPress(event: KeyboardEvent) {
    if (
      document.activeElement!.tagName !== "INPUT" &&
      document.activeElement!.tagName !== "TEXTAREA" &&
      !document.activeElement!.className.includes("ProseMirror")
    )
      if (event.key === "k") {
        setOpen(true);
      }
  }

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, location]);

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
    console.log(query.length);
    if (query.length !== 0 && query !== "") {
      GlobalTicketSearch();
    }
  }, [query]);

  function handleRouting(id) {
    setQuery("");
    setOpen(false);
    router.push(`/ticket/${id}`);
  }

  return (
    <>
      <Button
        variant="outline"
        className="hover:cursor-pointer"
        onClick={() => setOpen(true)}
      >
        Search
        <kbd className="inline-flex items-center rounded border ml-2 border-gray-200 px-1 font-sans text-xs text-gray-400">
          K
        </kbd>
      </Button>
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
                                key={action.shortcut}
                                value={action}
                                className={({ active }) =>
                                  classNames(
                                    "flex cursor-default select-none items-center rounded-md px-3 py-2",
                                    active && "bg-gray-800 text-white"
                                  )
                                }
                              >
                                {({ active }) => (
                                  <>
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
                                    <span className="ml-3 flex-none text-xs font-semibold text-gray-400">
                                      <kbd className="font-sans">⌘</kbd>
                                      <kbd className="font-sans">
                                        {action.shortcut}
                                      </kbd>
                                    </span>
                                  </>
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
                                "flex cursor-default select-none items-center rounded-md px-3 py-2 text-gray-500",
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

export default function NewLayout({ children }: any) {
  const location = useRouter();

  const { loading, user, fetchUserProfile } = useUser();
  const locale = user ? user.language : "en";

  const [queues, setQueues] = useState([]);

  const { t, lang } = useTranslation("peppermint");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState("unread");
  const [currentPath, setCurrentPath] = useState();

  if (!user) {
    location.push("/auth/login");
  }

  if (location.pathname.includes("/admin") && user.isAdmin === false) {
    location.push("/");
    alert("You do not have the correct perms for that action.");
  }

  if (user && user.external_user) {
    location.push("/portal");
  }

  const navigation = [
    {
      name: t("create_ticket"),
      href: `/${locale}/new`,
      icon: PlusIcon,
      current: location.pathname === "/new" ? true : false,
      initial: "c",
    },
    {
      name: t("sl_dashboard"),
      href: `/${locale}/`,
      icon: HomeIcon,
      current: location.pathname === "/" ? true : false,
      initial: "h",
    },
    {
      name: t("sl_notebook"),
      href: `/${locale}/notebook`,
      icon: FolderIcon,
      current: location.pathname === "/notebook" ? true : false,
      initial: "n",
    },
    // {
    //   name: "Email Queues",
    //   current: false,
    //   icon: InboxStackIcon,
    //   href: `/${locale}/tickets`,
    //   children: queues,
    //   inital: null,
    // },
  ];

  const admin_settings = [
    {
      name: t("sl_users"),
      href: "/admin/users/internal",
      current: location.pathname === "/admin/users/internal",
    },
    {
      name: t("sl_clients"),
      href: "/admin/clients",
      current: location.pathname === "/admin/clients",
    },
    {
      name: "Email Queues",
      href: "/admin/email-queues",
      current: location.pathname === "/admin/email-queues",
    },
    {
      name: "Webhooks",
      href: "/admin/webhooks",
      current: location.pathname === "/admin/webhooks",
    },
    {
      name: "Outbound Emails",
      href: "/admin/email",
      current: location.pathname === "/admin/email",
    },
    {
      name: "SSO",
      href: "/admin/sso",
      current: location.pathname === "/admin/sso",
    },
  ];

  // async function getQueues() {
  //   const res = await fetch(
  //     `/api/v1/email-queues/all`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${getCookie("session")}`,
  //       },
  //     }
  //   ).then((res) => res.json());
  //   setQueues(res.queues);
  // }

  async function logout() {
    const res = await fetch(`/api/v1/auth/user/${user.id}/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie("session")}`,
      },
    }).then((res) => res.json());

    if (res.success) {
      deleteCookie("session");
      location.reload();
    }
  }

  function handleKeyPress(event: any) {
    const pathname = location.pathname;
    console.log(pathname);
    if (
      document.activeElement!.tagName !== "INPUT" &&
      document.activeElement!.tagName !== "TEXTAREA" &&
      !document.activeElement!.className.includes("ProseMirror") &&
      !pathname.includes("/new")
    ) {
      switch (event.key) {
        case "c":
          location.push("/new");
          break;
        case "h":
          location.push("/");
          break;
        case "n":
          location.push("/notebook");
          break;
        case "t":
          location.push("/tickets");
          break;
        case "a":
          location.push("/admin");
          break;
        case "o":
          location.push("/tickets/open");
          break;
        case "f":
          location.push("/tickets/closed");
          break;
        default:
          break;
      }
    }
  }

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress, location]);

  return (
    !loading &&
    user && (
      <div className="min-h-screen overflow-hidden bg-white dark:bg-[#0A090C]">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                    <div className="flex align-middle flex-row h-14 items-center border-b-[1px]">
                      {/* <img className="h-8 w-auto" src="/logo.svg" alt="Workflow" /> */}
                      <Link href="https://peppermint.sh">
                        <span className="text-3xl ml-2  hover:text-green-600 font-bold ">
                          Peppermint
                        </span>
                      </Link>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item: any) =>
                              !item.children ? (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    className={classNames(
                                      item.current
                                        ? "bg-gray-50 text-indigo-600"
                                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                    )}
                                  >
                                    <item.icon
                                      className={classNames(
                                        item.current
                                          ? "text-indigo-600"
                                          : "text-gray-400 group-hover:text-indigo-600",
                                        "h-6 w-6 shrink-0"
                                      )}
                                      aria-hidden="true"
                                    />
                                    <span className="whitespace-nowrap">
                                      {item.name}
                                    </span>
                                  </Link>
                                </li>
                              ) : (
                                <Disclosure
                                  as="div"
                                  key={item.name}
                                  className="space-y-1"
                                >
                                  {({ open }) => (
                                    <>
                                      {queues.length > 0 && (
                                        <>
                                          <Disclosure.Button
                                            className={classNames(
                                              item.current
                                                ? "bg-green-400 text-white"
                                                : "bg-gray-900 text-white hover:bg-green-400 hover:text-white",
                                              "group w-full flex items-center pl-2 pr-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none"
                                            )}
                                          >
                                            <svg
                                              className={classNames(
                                                open
                                                  ? "text-white rotate-90"
                                                  : "text-white",
                                                "mr-2 flex-shrink-0 h-5 w-5 transform group-hover:text-white transition-colors ease-in-out duration-150"
                                              )}
                                              viewBox="0 0 20 20"
                                              aria-hidden="true"
                                            >
                                              <path
                                                d="M6 6L14 10L6 14V6Z"
                                                fill="currentColor"
                                              />
                                            </svg>
                                            {item.name}
                                          </Disclosure.Button>
                                          <Disclosure.Panel className="space-y-1">
                                            {item.children.map(
                                              (subItem: any) => (
                                                <Link
                                                  href={`/queue/${subItem.name}`}
                                                >
                                                  <Disclosure.Button
                                                    key={subItem.name}
                                                    className="group w-full flex items-center pl-10 pr-2 py-2 text-sm font-medium text-white rounded-md hover:text-white hover:bg-green-400 focus:outline-none"
                                                  >
                                                    {subItem.name}
                                                  </Disclosure.Button>
                                                </Link>
                                              )
                                            )}
                                          </Disclosure.Panel>
                                        </>
                                      )}
                                    </>
                                  )}
                                </Disclosure>
                              )
                            )}
                          </ul>
                        </li>

                        {user.isAdmin && (
                          <li>
                            <span className="mb-2 text-sm font-bold">
                              Admin Settings
                            </span>
                            <ul role="list" className="-mx-2 space-y-1">
                              {admin_settings.map((item: any) =>
                                !item.children ? (
                                  <li key={item.name}>
                                    <Link
                                      href={item.href}
                                      className={classNames(
                                        item.current
                                          ? "bg-gray-50 text-indigo-600"
                                          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                      )}
                                    >
                                      {/* <item.icon
                                     className={classNames(
                                       item.current
                                         ? "text-indigo-600"
                                         : "text-gray-400 group-hover:text-indigo-600",
                                       "h-6 w-6 shrink-0"
                                     )}
                                     aria-hidden="true"
                                   /> */}
                                      <span className="whitespace-nowrap">
                                        {item.name}
                                      </span>
                                    </Link>
                                  </li>
                                ) : (
                                  <Disclosure
                                    as="div"
                                    key={item.name}
                                    className="space-y-1"
                                  >
                                    {({ open }) => (
                                      <>
                                        {queues.length > 0 && (
                                          <>
                                            <Disclosure.Button
                                              className={classNames(
                                                item.current
                                                  ? "bg-green-400 text-white"
                                                  : "bg-gray-900 text-white hover:bg-green-400 hover:text-white",
                                                "group w-full flex items-center pl-2 pr-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none"
                                              )}
                                            >
                                              <svg
                                                className={classNames(
                                                  open
                                                    ? "text-white rotate-90"
                                                    : "text-white",
                                                  "mr-2 flex-shrink-0 h-5 w-5 transform group-hover:text-white transition-colors ease-in-out duration-150"
                                                )}
                                                viewBox="0 0 20 20"
                                                aria-hidden="true"
                                              >
                                                <path
                                                  d="M6 6L14 10L6 14V6Z"
                                                  fill="currentColor"
                                                />
                                              </svg>
                                              {item.name}
                                            </Disclosure.Button>
                                            <Disclosure.Panel className="space-y-1">
                                              {item.children.map(
                                                (subItem: any) => (
                                                  <Link
                                                    href={`/queue/${subItem.name}`}
                                                  >
                                                    <Disclosure.Button
                                                      key={subItem.name}
                                                      className="group w-full flex items-center pl-10 pr-2 py-2 text-sm font-medium text-white rounded-md hover:text-white hover:bg-green-400 focus:outline-none"
                                                    >
                                                      {subItem.name}
                                                    </Disclosure.Button>
                                                  </Link>
                                                )
                                              )}
                                            </Disclosure.Panel>
                                          </>
                                        )}
                                      </>
                                    )}
                                  </Disclosure>
                                )
                              )}
                            </ul>
                          </li>
                        )}

                        <li className="mt-auto">
                          <a
                            href="#"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                          >
                            <Cog6ToothIcon
                              className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                              aria-hidden="true"
                            />
                            Settings
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-64 2xl:w-72 lg:flex-col border-r-[1px]">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto  bg-[#ffffff] dark:bg-[#393E46] pb-4">
            <div className="flex align-middle flex-row h-14 items-center border-b-[1px] px-6">
              {/* <img className="h-8 w-auto" src="/logo.svg" alt="Workflow" /> */}
              <Link href="https://peppermint.sh">
                <span className="text-3xl ml-2  hover:text-green-600 font-bold ">
                  Peppermint
                </span>
              </Link>
            </div>
            <nav className="flex flex-1 flex-col px-6">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item: any) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className={classNames(
                            item.current
                              ? "bg-[#F0F3F9] dark:bg-gray-800 dark:text-green-600"
                              : " hover:bg-[#F0F3F9] dark:hover:bg-gray-800 dark:hover:text-gray-900 ",
                            "group -mx-2 flex gap-x-3 p-1 text-xs rounded-md font-semibold leading-6"
                          )}
                        >
                          <item.icon
                            className="h-4 w-4 ml-1 shrink-0 mt-1"
                            aria-hidden="true"
                          />
                          <span className="whitespace-nowrap">{item.name}</span>
                          <div className="flex w-full justify-end float-right">
                            <span className="flex h-6 w-6 shrink-0 items-center bg-transparent border-none justify-center text-md font-medium">
                              {item.initial}
                            </span>
                          </div>
                        </Link>
                      </li>
                    ))}
                    <ul className="w-full space-y-1">
                      <li>
                        <Link
                          href="/tickets"
                          className={classNames(
                            location.pathname === "/tickets"
                              ? "bg-[#F0F3F9] dark:bg-gray-800 dark:text-green-600"
                              : " hover:bg-[#F0F3F9] dark:hover:bg-white dark:hover:text-gray-900 ",
                            "group -mx-2 flex gap-x-3 p-1 rounded-md text-xs font-semibold leading-6"
                          )}
                        >
                          <TicketIcon className="h-4 w-4 ml-1 shrink-0 mt-1" />
                          <span className="whitespace-nowrap">Tickets</span>
                          <div className="flex w-full justify-end float-right">
                            <span className="flex h-6 w-6 shrink-0 items-center bg-transparent border-none justify-center text-md font-medium">
                              t
                            </span>
                          </div>
                        </Link>
                      </li>
                      <li className="ml-8">
                        <Link
                          href="/tickets/open"
                          className={classNames(
                            location.pathname === "/tickets/open"
                              ? "bg-[#F0F3F9] dark:bg-gray-800 dark:text-green-600"
                              : " hover:bg-[#F0F3F9] dark:hover:bg-white dark:hover:text-gray-900 ",
                            "group -mx-2 flex gap-x-3 p-1 pl-3 rounded-md text-xs font-semibold leading-6"
                          )}
                        >
                          <span className="whitespace-nowrap">
                            {user.name}'s open
                          </span>
                          <div className="flex w-full justify-end float-right">
                            <span className="flex h-6 w-6 shrink-0 items-center bg-transparent border-none justify-center text-md font-medium">
                              o
                            </span>
                          </div>
                        </Link>
                      </li>

                      <li className="ml-8 ">
                        <Link
                          href="/tickets/closed"
                          className={classNames(
                            location.pathname === "/tickets/closed"
                              ? "bg-[#F0F3F9] dark:bg-gray-800 dark:text-green-600"
                              : " hover:bg-[#F0F3F9] dark:hover:bg-white dark:hover:text-gray-900 ",
                            "group -mx-2 flex gap-x-3 p-1 pl-3 rounded-md text-xs font-semibold leading-6"
                          )}
                        >
                          <span className="whitespace-nowrap">
                            {user.name}'s closed
                          </span>
                          <div className="flex w-full justify-end float-right">
                            <span className="flex h-6 w-6 shrink-0 items-center bg-transparent border-none justify-center text-md font-medium">
                              f
                            </span>
                          </div>
                        </Link>
                      </li>
                    </ul>
                    <li className="mt-auto space-y-4">
                      {user.isAdmin && (
                        <Link
                          href="/admin"
                          className={classNames(
                            location.pathname.includes("/admin")
                              ? "bg-[#F0F3F9] dark:bg-gray-800 dark:text-green-600"
                              : " hover:bg-[#F0F3F9] dark:hover:bg-white dark:hover:text-gray-900 ",
                            "group -mx-2 flex gap-x-3 p-1 rounded-md text-xs font-semibold leading-6"
                          )}
                        >
                          <ContextMenu.Root>
                            <ContextMenu.Trigger>
                              <>
                                <Cog6ToothIcon
                                  className="h-4 w-4 ml-1 shrink-0 mt-1"
                                  aria-hidden="true"
                                />
                                <span className="whitespace-nowrap">
                                  {t("admin_settings")}
                                </span>
                                <div className="flex w-full justify-end float-right">
                                  <span className="flex h-6 w-6 shrink-0 items-center bg-transparent border-none justify-center text-md font-medium">
                                    a
                                  </span>
                                </div>
                              </>
                            </ContextMenu.Trigger>
                            <ContextMenu.Content>
                              <ContextMenu.Item shortcut="⌘ E">
                                Edit
                              </ContextMenu.Item>
                              <ContextMenu.Item shortcut="⌘ D">
                                Duplicate
                              </ContextMenu.Item>
                              <ContextMenu.Separator />
                              <ContextMenu.Item shortcut="⌘ N">
                                Archive
                              </ContextMenu.Item>

                              <ContextMenu.Sub>
                                <ContextMenu.SubTrigger>
                                  More
                                </ContextMenu.SubTrigger>
                                <ContextMenu.SubContent>
                                  <ContextMenu.Item>
                                    Move to project…
                                  </ContextMenu.Item>
                                  <ContextMenu.Item>
                                    Move to folder…
                                  </ContextMenu.Item>
                                  <ContextMenu.Separator />
                                  <ContextMenu.Item>
                                    Advanced options…
                                  </ContextMenu.Item>
                                </ContextMenu.SubContent>
                              </ContextMenu.Sub>

                              <ContextMenu.Separator />
                              <ContextMenu.Item>Share</ContextMenu.Item>
                              <ContextMenu.Item>
                                Add to favorites
                              </ContextMenu.Item>
                              <ContextMenu.Separator />
                              <ContextMenu.Item shortcut="⌘ ⌫" color="red">
                                Delete
                              </ContextMenu.Item>
                            </ContextMenu.Content>
                          </ContextMenu.Root>
                        </Link>
                      )}
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-64 2xl:pl-72">
          <div className="sticky top-0 z-10 flex h-14 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white dark:bg-[#0A090C] px-4 sm:gap-x-6">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-black dark:text-white lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon
                className="h-6 w-6 text-black dark:text-white"
                aria-hidden="true"
              />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-400 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center">
              <div className="flex w-full justify-start items-center space-x-6">
                {user.isAdmin && (
                  <Link href="https://github.com/Peppermint-Lab/peppermint/releases">
                    <span className="inline-flex items-center rounded-md bg-green-700/10 px-3 py-2 text-xs font-medium text-green-600 ring-1 ring-inset ring-green-500/20">
                      Version 0.4.8
                    </span>
                  </Link>
                )}

                <CommandModal />
              </div>

              <div className="flex w-full justify-end items-center gap-x-2 lg:gap-x-2 ">
                <Button
                  variant="outline"
                  className="relative rounded-md  p-2  text-gray-400 hover:text-gray-500 hover:cursor-pointer focus:outline-none"
                >
                  <Link href="/notifications">
                    <InboxStackIcon className="h-4 w-4 text-black" />
                    {user.notifcations.filter(
                      (notification) => !notification.read
                    ).length > 0 && (
                      <svg
                        className="h-2.5 w-2.5 absolute bottom-6 left-6  animate-pulse fill-green-500"
                        viewBox="0 0 6 6"
                        aria-hidden="true"
                      >
                        <circle cx={3} cy={3} r={3} />
                      </svg>
                    )}
                  </Link>
                </Button>

                {user.isAdmin && (
                  <Link
                    href="https://github.com/Peppermint-Lab/peppermint/discussions"
                    target="_blank"
                    className="hover:cursor-pointer"
                  >
                    {/* <Button variant="outline" className="hover:cursor-pointer">
                      Send Feedback
                    </Button> */}

                    <Button variant="outline" className="hover:cursor-pointer whitespace-nowrap">
                      Send Feedback
                    </Button>
                  </Link>
                )}

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="z-50 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-500">
                      <span className="text-xs mt-0.5 font-medium leading-none text-white uppercase">
                        {user.name[0]}
                      </span>
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="bg-white absolute right-0 z-50 w-40 origin-top-right rounded-md  shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="/settings/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-3 text-sm font-bold h-full p-2 w-full rounded-md text-gray-900"
                            )}
                          >
                            {t("profile")}
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            onClick={() => {
                              logout();
                            }}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-3 text-left text-sm font-bold h-full p-2 w-full rounded-md text-gray-900"
                            )}
                          >
                            {t("logout")}
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {!loading && !user.external_user && (
            <main className="bg-white dark:bg-[#0A090C]">{children}</main>
          )}
        </div>
      </div>
    )
  );
}
