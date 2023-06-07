import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Dialog, Menu, Transition, Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  InboxIcon,
  InboxStackIcon,
  MagnifyingGlassIcon,
  TicketIcon,
} from "@heroicons/react/20/solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import useTranslation from "next-translate/useTranslation";
import CreateTicketModal from "../components/CreateTicketModal";
import { spotlight } from "@mantine/spotlight";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NewLayout({ children }) {
  const location = useRouter();

  const [queues, setQueues] = useState([]);

  const { t, lang } = useTranslation("peppermint");

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();

  if (status === "unauthenticated") {
    location.push("/auth/login");
  }

  if (location.pathname.includes("/admin") && session.isAdmin === false) {
    location.push("/");
    alert("You do not have the correct perms for that action.");
  }

  const locale = session.user.language || "en";

  const navigation = [
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
    {
      name: t("sl_tickets"),
      current: location.pathname.includes("/ticket") ? true : false,
      icon: TicketIcon,
      href: `/${locale}/tickets`,
      initial: "t",
    },
    {
      name: "Email Queues",
      current: false,
      icon: InboxStackIcon,
      href: `/${locale}/tickets`,
      children: queues,
      inital: null,
    },
  ];

  const teams = [
    { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
    { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
    { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
  ];
  const userNavigation = [
    { name: "Your profile", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  async function getQueues() {
    const res = await fetch("/api/v1/admin/email-queue/check").then((res) =>
      res.json()
    );
    setQueues(res.queues);
  }

  useEffect(() => {
    // location.push(location.pathname, location.asPath, {
    //   locale,
    // });
    getQueues();
  }, []);

  const handleKeyPress = useCallback((event) => {
    console.log(`Key pressed: ${event.key}`);
    console.log(document.activeElement.tagName);
    if (
      document.activeElement.tagName !== "INPUT" &&
      !document.activeElement.className.includes("ProseMirror")
    ) {
      switch (event.key) {
        case "c":
          var btn = document.getElementById("ticket_create");
          btn.click();
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
        default:
          break;
      }
    }
  }, []);

  useEffect(() => {
    // attach the event listener
    document.addEventListener("keydown", handleKeyPress);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <div>
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
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            <CreateTicketModal />
                            {navigation.map((item) =>
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
                                    <div className="flex w-full justify-end float-right">
                                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                        {item.initial}
                                      </span>
                                    </div>
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
                                            {item.children.map((subItem) => (
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
                                            ))}
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
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-10 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-gray-900 px-6 pb-4">
            <div className="flex align-middle flex-row h-16 items-center">
              <img className="h-8 w-auto" src="/logo.svg" alt="Workflow" />
              <Link href="https://peppermint.sh">
                <h1 className="text-4xl ml-2 mt-5 hover:text-green-600 font-extrabold text-white">
                  Peppermint
                </h1>
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    <CreateTicketModal />
                    {navigation.map((item) =>
                      !item.children ? (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-green-400 text-white hover:text-white"
                                : "text-white hover:text-white hover:bg-green-500",
                              "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                            )}
                          >
                            <item.icon
                              className={classNames(
                                item.current ? "text-white" : "text-white",
                                "h-6 w-6 shrink-0"
                              )}
                              aria-hidden="true"
                            />
                            <span className="whitespace-nowrap">
                              {item.name}
                            </span>
                            <div className="flex w-full justify-end float-right">
                              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                {item.initial}
                              </span>
                            </div>
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
                                    {item.children.map((subItem) => (
                                      <Link href={`/queue/${subItem.name}`}>
                                        <Disclosure.Button
                                          key={subItem.name}
                                          className="group w-full flex items-center pl-10 pr-2 py-2 text-sm font-medium text-white rounded-md hover:text-white hover:bg-green-400 focus:outline-none"
                                        >
                                          {subItem.name}
                                        </Disclosure.Button>
                                      </Link>
                                    ))}
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
                <li className="mt-auto">
                  <Link
                    href="/admin"
                    className={classNames(
                      location.pathname.includes("/admin")
                        ? "bg-green-400 text-white"
                        : "text-white hover:bg-green-500 hover:text-white",
                      "group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                    )}
                  >
                    <Cog6ToothIcon
                      className="h-6 w-6 shrink-0 text-white group-hover:text-white"
                      aria-hidden="true"
                    />
                    <span className="whitespace-nowrap">Admin Settings</span>
                    <div className="flex w-full justify-end float-right">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                        a
                      </span>
                    </div>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-white lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6 text-gray-900" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-400 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <div
                className="relative mt-2 flex items-center w-1/3 hover:cursor-pointer"
                onClick={() => {
                  spotlight.open();
                }}
              >
                <input
                  type="text"
                  name="search"
                  id="search"
                  readOnly
                  placeholder="Spotlight Search"
                  onClick={() => {
                    spotlight.open();
                  }}
                  className="block w-full hover:cursor-pointer rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                <div className="absolute inset-y-0 right-0 flex py-4 pr-1.5">
                  <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                    /
                  </kbd>
                </div>
              </div>
              <div className="flex w-full justify-end items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5  text-white hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  {/* <BellIcon className="h-6 w-6 text-gray-900" aria-hidden="true" /> */}
                </button>

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="-m-1.5 z-50 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                      <span className="text-sm mt-0.5 ml-0.5 font-medium leading-none text-white">
                        A
                      </span>
                    </span>
                    <span className="hidden lg:flex lg:items-center">
                      <span
                        className="ml-4 text-sm font-semibold leading-6"
                        aria-hidden="true"
                      >
                        Tom Cook
                      </span>
                      <ChevronDownIcon
                        className="ml-2 h-5 w-5 mb-1 text-gray-400"
                        aria-hidden="true"
                      />
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
                    <Menu.Items className="absolute right-0 z-50 mt-2.5 w-32 origin-top-right rounded-md  py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-50" : "",
                                "block px-3 py-1 text-sm leading-6 text-gray-900"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className="py-10">
            <div className="px-4 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
