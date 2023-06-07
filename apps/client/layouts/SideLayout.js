import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Dialog, Transition, Disclosure } from "@headlessui/react";
import {
  FolderIcon,
  HomeIcon,
  TicketIcon,
  XIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { useTheme } from "next-themes";

import useTranslation from "next-translate/useTranslation";
import CreateTicketModal from "../components/CreateTicketModal";
import { Bars3Icon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SideLayout({ children }) {
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
      icon: TicketIcon,
      href: `/${locale}/tickets`,
      children: queues,
    },
  ];

  async function getQueues() {
    const res = await fetch("/api/v1/admin/email-queue/check").then((res) =>
      res.json()
    );
    setQueues(res.queues);
  }

  useEffect(() => {
    location.push(location.pathname, location.asPath, {
      locale,
    });
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
    <div>
      {status === "loading" && <div></div>}

      {status === "authenticated" && (
        <div className="h-screen flex overflow-hidden">
          <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog
              as="div"
              static
              className="fixed inset-0 flex z-40 lg:hidden"
              open={sidebarOpen}
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
                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-900">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-0 right-0 -mr-12 pt-2">
                      <button
                        className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        {/* <XIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        /> */}
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                    <div className="flex items-center flex-shrink-0 px-4">
                      <img
                        className="h-8 w-auto"
                        src="/logo.svg"
                        alt="Workflow"
                      />
                    </div>
                    <nav className="mt-5 px-2 space-y-1">
                      <CreateTicketModal />
                      {navigation.map((item) =>
                        !item.children ? (
                          <div key={item.name}>
                            <Link
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-green-400 text-white"
                                  : "bg-gray-900 text-white hover:bg-green-400 hover:text-white",
                                "group w-full flex items-center pr-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none"
                              )}
                            >
                              {item.name}
                            </Link>
                          </div>
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
                                          : "text-white bg-gray-900 hover:bg-green-400 hover:text-white",

                                        "group w-full flex items-center pr-2 py-2 text-left text-sm font-medium rounded-md focus:outline-none"
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
                                      {item.children.length > 0 &&
                                        item.children.map((subItem) => (
                                          <Disclosure.Button
                                            key={subItem.name}
                                            as="a"
                                            href={subItem.href}
                                            className="group w-full flex items-center pl-10 pr-2 py-2 text-sm font-medium text-white rounded-md hover:text-white hover:bg-green-400"
                                          >
                                            {subItem.name}
                                          </Disclosure.Button>
                                        ))}
                                    </Disclosure.Panel>
                                  </>
                                )}
                              </>
                            )}
                          </Disclosure>
                        )
                      )}
                    </nav>
                    <div
                      className={
                        session.user.isAdmin === true
                          ? "flex flex-col mt-8 px-3 "
                          : "hidden"
                      }
                    >
                      <h3
                        className="px-2 text-xs font-semibold text-white uppercase tracking-wider"
                        id="projects-headline"
                      >
                        Admin
                      </h3>
                      <div
                        className="mt-1 space-y-1"
                        aria-labelledby="projects-headline"
                      >
                        {/* {adminNavigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-green-500 text-white"
                                : "text-white hover:bg-green-400 hover:text-white",
                              "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                            )}
                          >
                            <span className="truncate">{item.name}</span>
                          </Link>
                        ))} */}
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex-col flex p-4">
                    <span className="hidden sm:inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
                      <span className="text-sm font-medium leading-none text-white uppercase">
                        {session.user.name[0]}
                      </span>
                    </span>
                    <p className="text-base font-medium text-white">
                      {session.user.name}
                    </p>
                    <Link
                      href="/settings"
                      className="flex-shrink-0 group block"
                    >
                      <div className="flex items-center">
                        <div className="">
                          <p className="text-sm font-medium text-white">
                            View profile
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14">
                {/* Force sidebar to shrink to fit close icon */}
              </div>
            </Dialog>
          </Transition.Root>

          {/* Static sidebar for desktop */}
          <div className="hidden lg:flex md:flex-shrink-0">
            <div className="flex flex-col w-64">
              {/* Sidebar component, swap this element with another sidebar if you like */}
              <div className="flex flex-col h-0 flex-1 bg-gray-900">
                <div className="flex-1 flex flex-col pt-5 overflow-y-auto">
                  <div className="flex flex-shrink-0 px-4 align-middle flex-row">
                    <img
                      className="h-8 w-auto"
                      src="/logo.svg"
                      alt="Workflow"
                    />
                    <Link href="https://peppermint.sh">
                      <h1 className="text-2xl ml-2 mt-1 hover:text-green-600 font-extrabold text-white">
                        Peppermint
                      </h1>
                    </Link>
                  </div>
                  <nav className="mt-1 flex-1 px-2 bg-gray-900 space-y-1">
                    <CreateTicketModal />
                    {navigation.map((item) =>
                      !item.children ? (
                        <div key={item.name}>
                          <Link
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-green-400 text-white hover:text-white"
                                : "bg-gray-900 text-white hover:bg-green-400 hover:text-white",
                              "group w-full flex items-center pl-2 pr-2 py-2 text-sm font-medium rounded-md"
                            )}
                          >
                            <item.icon
                              className="text-white mr-3 flex-shrink-0 h-6 w-6"
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
                        </div>
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
                  </nav>
                  <div
                    className={session.user.isAdmin === true ? "" : "hidden"}
                  >
                    <div
                      className="mt-1 space-y-1 px-2"
                      aria-labelledby="projects-headline"
                    >
                      <Link
                        href="/admin"
                        className="group flex items-center px-2 py-2 text-xs font-semibold text-white rounded-md hover:bg-green-400 hover:text-white uppercase tracking-wider"
                      >
                        <span className="">ADMIN</span>
                        <div className="flex w-full justify-end float-right">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            a
                          </span>
                        </div>
                      </Link>
                      <a
                        href="https://ko-fi.com/L3L0AA4YE"
                        target="_blank"
                        passHref
                      >
                        <img
                          className="px-2 py-2 h-12 w-full"
                          height="36"
                          src="/kofi-white.png"
                          border="0"
                          alt="Buy Me a Coffee at ko-fi.com"
                        />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 flex border-t border-gray-900 p-4">
                  <div className="flex-shrink-0 w-full group block">
                    <div className="flex items-center">
                      <div>
                        <span className="hidden sm:inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
                          <span className="text-sm font-medium leading-none text-white uppercase">
                            {session.user.name[0]}
                          </span>
                        </span>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-white">
                          {session.user.name} [{lang}/{session.user.language}]
                        </p>
                        <Link href="/settings">
                          <p className="text-xs font-medium text-white group-hover:text-green-400">
                            View profile
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-0 flex-1 bg-slate-100">
            <div className="lg:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
              <button
                className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              </button>
            </div>
            <main className="flex-1 relative z-0 focus:outline-none overflow-y-auto bg-slate-100">
              <div className="py-6">
                <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
                  <div className="py-4">{children}</div>
                </div>
              </div>
            </main>
          </div>
        </div>
      )}
    </div>
  );
}
