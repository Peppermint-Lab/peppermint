import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUser } from "../store/session";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import {
  Bars3Icon,
  InboxStackIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button } from "@radix-ui/themes";
import { AccountDropdown } from "../components/AccountDropdown";
import { classNames } from "@/shadcn/lib/utils";
import { ContactIcon, KeyRound, Mail, Mailbox, MoveLeft, User2, UserRound, Webhook } from "lucide-react";


export default function AdminLayout({ children }: any) {
  const { t, lang } = useTranslation("peppermint");
  const router = useRouter();

  const { loading, user } = useUser();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (user && !user.isAdmin) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold">You are not an admin</h1>
      </div>
    );
  }

  const navigation = [
    {
      name: "Back",
      href: "/",
      current: null,
      icon: MoveLeft,
    },
    {
      name: t("sl_users"),
      href: "/admin/users/internal",
      current: location.pathname === "/admin/users/internal",
      icon: UserRound,
    },
    {
      name: t("sl_clients"),
      href: "/admin/clients",
      current: location.pathname === "/admin/clients",
      icon: ContactIcon,
    },
    {
      name: "Email Queues",
      href: "/admin/email-queues",
      current: location.pathname === "/admin/email-queues",
      icon: Mail,
    },
    {
      name: "Webhooks",
      href: "/admin/webhooks",
      current: location.pathname === "/admin/webhooks",
      icon: Webhook,
    },
    {
      name: "Outbound Emails",
      href: "/admin/email",
      current: location.pathname === "/admin/email",
      icon: Mailbox,
    },
    {
      name: "SSO",
      href: "/admin/sso",
      current: location.pathname === "/admin/sso",
      icon: KeyRound,
    },
  ];

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
              <ul role="list" className="flex flex-1 flex-col gap-y-7 w-full">
                <li>
                  <ul role="list" className="-mx-2 space-y-1 w-full">
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
                      Version 0.4.9
                    </span>
                  </Link>
                )}

                {/* <CommandModal /> */}
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
                    <Button
                      variant="outline"
                      className="hover:cursor-pointer whitespace-nowrap"
                    >
                      Send Feedback
                    </Button>
                  </Link>
                )}

                {/* Profile dropdown */}
                <AccountDropdown />
              </div>
            </div>
          </div>

          {!loading && !user.external_user && (
            <main className="bg-white dark:bg-[#0A090C] m-4">{children}</main>
          )}
        </div>
      </div>
    )
  );
}
