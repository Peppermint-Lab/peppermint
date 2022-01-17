import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  ArchiveIcon,
  FolderIcon,
  HomeIcon,
  MenuIcon,
  TicketIcon,
  XIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";

import CreateTicketModal from '../CreateTicketModal'

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

export default function SideLayout({ children }) {
    const location = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = {
        firstName:'Jack',
        lastName: 'Wanker'
    }
  
    const navigation = [
      {
        name: "Dashboard",
        href: "/",
        icon: HomeIcon,
        current: location.pathname === "/" ? true : false,
      },
      {
        name: "Tickets",
        href: "/tickets",
        icon: TicketIcon,
        current: location.pathname === "/tickets" ? true : false,
      },
      {
        name: "History",
        href: "/history",
        icon: ArchiveIcon,
        current: location.pathname === "/history" ? true : false,
      },
      {
        name: "Personal Notebook",
        href: "/notebook",
        icon: FolderIcon,
        current: location.pathname === "/notebook" ? true : false,
      }
    ];
  
    const secondaryNavigation = [
      {
        name: "Dashboard",
        href: "/admin/dashboard",
      },
      { name: "Clients", href: "/admin/clients" },
      { name: "Internal Users", href: "/admin/internal" },
    ];
  
    return (
      <div className="h-screen flex overflow-hidden">
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            static
            className="fixed inset-0 flex z-40 md:hidden"
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
                      <XIcon className="h-6 w-6 text-white" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>
                <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                  <div className="flex items-center flex-shrink-0 px-4">
                    <img className="h-8 w-auto" src='/logo.svg' alt="Workflow" />
                  </div>
                  <nav className="mt-5 px-2 space-y-1">
                    <CreateTicketModal />
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-green-500 text-white"
                            : "text-white hover:bg-green-400 hover:text-white",
                          "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                        )}
                      >
                        <item.icon
                          className="text-white mr-3 flex-shrink-0 h-6 w-62"
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                  <div className={user.isAdmin ? "mt-8" : "hidden"}>
                    {/* <h3
                      className="px-3 text-xs font-semibold text-white uppercase tracking-wider"
                      id="projects-headline"
                    >
                      Projects
                    </h3> */}
                    <div
                      className="mt-1 space-y-1"
                      aria-labelledby="projects-headline"
                    >
                      {secondaryNavigation.map((item) => (
                        <a
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
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0 flex-col flex border-t border-gray-200 p-4">
                  <span className="hidden sm:inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
                    <span className="text-sm font-medium leading-none text-white">
                      {user.firstName[0] + user.lastName[0]}
                    </span>
                  </span>
                  <p className="text-base font-medium text-white">
                    {user.firstName + " " + user.lastName}
                  </p>
                  <a href="/settings" className="flex-shrink-0 group block">
                    <div className="flex items-center">
                      <div className="">
                        <p className="text-sm font-medium text-white">
                          View profile
                        </p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14">
              {/* Force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>
  
        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:flex-shrink-0">
          <div className="flex flex-col w-64">
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex flex-col h-0 flex-1 bg-gray-900">
              <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                <div className="flex flex-shrink-0 px-4 align-middle flex-row">
                  <img className="h-8 w-auto" src='/logo.svg' alt="Workflow" />
                  <a href="https://peppermint.sh" target="_blank" rel="noreferrer">
                    <h1 className="text-2xl ml-2 hover:text-green-600 font-extrabold text-white">
                      Peppermint
                    </h1>
                  </a>
                </div>
                <nav className="mt-5 flex-1 px-2 bg-gray-900 space-y-1">
                <CreateTicketModal />
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-green-500 text-white"
                          : "text-white hover:bg-green-400 hover:text-white",
                        "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                      )}
                    >
                      <item.icon
                        className={classNames(
                          "text-white mr-3 flex-shrink-0 h-6 w-6"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </nav>
                <div className="mt-8">
                  <h3
                    className="px-3 text-xs font-semibold text-white uppercase tracking-wider"
                    id="projects-headline"
                  >
                    Admin
                  </h3>
                  <div
                    className="mt-1 space-y-1"
                    aria-labelledby="projects-headline"
                  >
                    {secondaryNavigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="group flex items-center px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-green-400 hover:text-white"
                      >
                        <span className="truncate">{item.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-900 p-4">
                <div className="flex-shrink-0 w-full group block">
                  <div className="flex items-center">
                    <div>
                      <span className="hidden sm:inline-flex items-center justify-center h-8 w-8 rounded-full bg-gray-500">
                        <span className="text-sm font-medium leading-none text-white">
                          {user.firstName[0] + user.lastName[0]}
                        </span>
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-white">
                        {user.firstName + " " + user.lastName}
                      </p>
                      <a href="/settings">
                        <p className="text-xs font-medium text-white group-hover:text-green-400">
                          View profile
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-0 flex-1">
          <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
            <button
              className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <main className="flex-1 relative z-0 focus:outline-none min-h-screen overflow-y-scroll">
            <div className="py-6">
              <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8">
                <div className="py-4">{children}</div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
}