import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { PlusIcon, TicketIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  Cog6ToothIcon,
  FolderIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useCallback, useEffect, useState } from "react";

import { spotlight } from "@mantine/spotlight";
import useTranslation from "next-translate/useTranslation";
import { useUser } from "../store/session";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function NewLayout({ children }: any) {
  const location = useRouter();

  const { loading, user } = useUser();
  const locale = user ? user.language : "en";

  const [queues, setQueues] = useState([]);

  const { t, lang } = useTranslation("peppermint");

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    location.push("/auth/login");
  }

  if (location.pathname.includes("/admin") && user.isAdmin === false) {
    location.push("/");
    alert("You do not have the correct perms for that action.");
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
    {
      name: t("sl_tickets"),
      current: location.pathname.includes("/ticket") ? true : false,
      icon: TicketIcon,
      href: `/${locale}/tickets`,
      initial: "t",
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

  async function getQueues() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/email-queues/all`
    ).then((res) => res.json());
    setQueues(res.queues);
  }

  async function logout() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/user/${user.id}/logout`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookie("session")}`,
        },
      }
    ).then((res) => res.json());

    if (res.success) {
      deleteCookie("session");
      location.reload();
    }
  }

  useEffect(() => {
    getQueues();
  }, [user]);

  // useEffect(() => {
  // location.push(`${locale}/${location.pathname}`);
  // }, [user, location]);

  const handleKeyPress = useCallback((event: any) => {
    if (
      document.activeElement!.tagName !== "INPUT" &&
      document.activeElement!.tagName !== "TEXTAREA" &&
      !document.activeElement!.className.includes("ProseMirror")
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
    !loading && (
      <div className="min-h-screen overflow-hidden bg-slate-100">
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
          <div className="flex grow flex-col gap-y-5 overflow-y-auto  bg-gray-900 px-6 pb-4">
            <div className="flex align-middle flex-row h-16 items-center">
              {/* <img className="h-8 w-auto" src="/logo.svg" alt="Workflow" /> */}
              <Link href="https://peppermint.sh">
                <h1 className="text-4xl ml-2 mt-1 hover:text-green-600 font-extrabold text-white">
                  Peppermint
                </h1>
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
                                    {item.children.map((subItem: any) => (
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
                <li className="mt-auto space-y-4">
                  {/* <a href="https://ko-fi.com/L3L0AA4YE" target="_blank">
                    <img
                      className="py-1 h-12 w-full"
                      height="36"
                      src="/kofi-white.png"
                      alt="Buy Me a Coffee at ko-fi.com"
                    />
                  </a> */}
                  {user.isAdmin && (
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
                      <span className="whitespace-nowrap">
                        {t("admin_settings")}
                      </span>
                      <div className="flex w-full justify-end float-right">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                          a
                        </span>
                      </div>
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-gray-900 px-4 shadow-sm sm:gap-x-6">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-white lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6 text-white" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-400 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 pb-2">
              <div
                className="relative mt-2 hidden sm:flex items-center w-full min-w-[320px] max-w-[360px] hover:cursor-pointer"
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
                <div className="absolute inset-y-0 right-0 flex py-2.5 pr-1">
                  <kbd className="inline-flex items-center rounded border border-gray-200 px-1.5 font-sans text-xs text-gray-400">
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
                {/* <div
              className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
              aria-hidden="true"
            /> */}

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <Menu.Button className="mt-2 z-50 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-500">
                      <span className="text-sm mt-0.5 font-medium leading-none text-white uppercase">
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

          <main className="py-2">
            <div className="px-2 py-2 sm:px-4">{children}</div>
          </main>
        </div>
      </div>
    )
  );
}
