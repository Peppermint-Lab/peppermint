import { Dialog, Menu, Transition } from "@headlessui/react";
import { PlusIcon } from "@heroicons/react/20/solid";
import {
  Bars3Icon,
  Cog6ToothIcon,
  HomeIcon,
  TicketIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { deleteCookie, getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";

import useTranslation from "next-translate/useTranslation";
import { useUser } from "../store/session";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PortalLayout({ children }: any) {
  const location = useRouter();

  const { loading, user, fetchUserProfile } = useUser();
  const locale = user ? user.language : "en";

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

  const navigation = [
    {
      name: t("create_ticket"),
      href: `/${locale}/portal/new`,
      icon: PlusIcon,
      current: location.pathname === "/new" ? true : false,
      initial: "c",
    },
    {
      name: t("sl_dashboard"),
      href: `/${locale}/portal`,
      icon: HomeIcon,
      current: location.pathname === "/" ? true : false,
      initial: "h",
    },
  ];

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

  //   async function markasread(id) {
  //     await fetch(`/api/v1/user/notifcation/${id}`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${getCookie("session")}`,
  //       },
  //     }).then((res) => res.json());
  //     await fetchUserProfile();
  //   }

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
          location.push("/portal/new");
          break;
        case "h":
          location.push("/portal/");
          break;
        case "t":
          location.push("/portal/tickets");
          break;
        case "o":
          location.push("/portal/tickets/open");
          break;
        case "f":
          location.push("/portal/tickets/closed");
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
    !loading && (
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
                            {navigation.map((item: any) => (
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
                            ))}
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
                            "group -mx-2 flex gap-x-3 p-1 text-xs font-semibold leading-6"
                          )}
                        >
                          <item.icon
                            className="h-4 w-4 shrink-0 mt-1"
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
                          href="/portal/tickets"
                          className={classNames(
                            location.pathname === "/portal/tickets"
                              ? "bg-[#F0F3F9] dark:bg-gray-800 dark:text-green-600"
                              : " hover:bg-[#F0F3F9] dark:hover:bg-white dark:hover:text-gray-900 ",
                            "group -mx-2 flex gap-x-3 p-1 text-xs font-semibold leading-6"
                          )}
                        >
                          <TicketIcon className="h-4 w-4 shrink-0 mt-1" />
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
                          href="/portal/tickets/open"
                          className={classNames(
                            location.pathname === "/portal/tickets/open"
                              ? "bg-[#F0F3F9] dark:bg-gray-800 dark:text-green-600"
                              : " hover:bg-[#F0F3F9] dark:hover:bg-white dark:hover:text-gray-900 ",
                            "group -mx-2 flex gap-x-3 p-1 mll-2 text-xs font-semibold leading-6"
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
                          href="/portal/tickets/closed"
                          className={classNames(
                            location.pathname === "/portal/tickets/closed"
                              ? "bg-[#F0F3F9] dark:bg-gray-800 dark:text-green-600"
                              : " hover:bg-[#F0F3F9] dark:hover:bg-white dark:hover:text-gray-900 ",
                            "group -mx-2 flex gap-x-3 p-1 text-xs font-semibold leading-6"
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
              <div className="flex w-full justify-end items-center gap-x-2 lg:gap-x-2 ">
                {/* <Popover className="relative">
                  <Popover.Button className="relative border rounded-md  p-2 shadow-md text-gray-400 hover:text-gray-500 focus:outline-none">
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
                  </Popover.Button>

                  <Popover.Panel className="absolute z-10 mt-1 sm:min-w-[400px] right-1 overflow-hidden rounded-lg bg-white shadow">
                    <div className="px-6 p-6">
                      <div className="border-b border-gray-200">
                        <nav
                          className="-mb-px flex space-x-8"
                          aria-label="Tabs"
                        >
                          <button
                            onClick={() => setTab("unread")}
                            className={classNames(
                              tab === "unread"
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                              "whitespace-nowrap border-b-2  px-1 text-sm font-medium"
                            )}
                          >
                            Unread
                          </button>
                          <button
                            onClick={() => setTab("archive")}
                            className={classNames(
                              tab === "archive"
                                ? "border-indigo-500 text-indigo-600"
                                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                              "whitespace-nowrap border-b-2 px-1 text-sm font-medium"
                            )}
                          >
                            Archive
                          </button>
                        </nav>
                      </div>
                      <div className="mt-2">
                        {user !== undefined ? (
                          tab === "unread" ? (
                            user.notifcations
                              .filter((notification) => !notification.read)
                              .map((notification: any) => (
                                <div className="w-full items-start border-b py-3">
                                  <div className="flex justify-between flex-row w-full">
                                    <p className="text-md font-medium text-gray-900">
                                      {notification.text}
                                    </p>
                                    <button
                                      type="button"
                                      onClick={() =>
                                        markasread(notification.id)
                                      }
                                      className="rounded bg-transparent  text-sm font-semibold"
                                    >
                                      <ArchiveBoxIcon className="h-5 w-5 text-green-500 hover:text-green-600" />
                                    </button>
                                  </div>
                                </div>
                              ))
                          ) : (
                            user.notifcations
                              .filter((notification) => notification.read)
                              .map((notification: any) => (
                                <div className="w-full items-start border-b py-3">
                                  <div className="flex justify-between flex-row w-full">
                                    <p className="text-md font-medium text-gray-900">
                                      {notification.text}
                                    </p>
                                  </div>
                                </div>
                              ))
                          )
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </Popover.Panel>
                </Popover>

                <Link
                  href="https://github.com/Peppermint-Lab/peppermint/discussions"
                  target="_blank"
                  className="hover:cursor-pointer"
                >
                  <Button variant="outline" className="hover:cursor-pointer">
                    Send Feedback
                  </Button>
                </Link> */}

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
                      {/* <Menu.Item>
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
                      </Menu.Item> */}
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

          <main className="bg-white dark:bg-[#0A090C]">{children}</main>
        </div>
      </div>
    )
  );
}
