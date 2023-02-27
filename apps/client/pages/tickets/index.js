import { useState } from "react";
import Loader from "react-spinners/ClipLoader";
import { useRouter } from "next/router";
import Link from "next/link";

import OpenTickets from "../../components/TicketViews/open";
import AssignedTickets from "../../components/TicketViews/assigned";
import UnassignedTickets from "../../components/TicketViews/unassiged";
import ClosedTickets from "../../components/TicketViews/closed";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Tickets() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const tabs = [
    {
      name: "Open",
      href: "/tickets",
      //   count: "",
      current: router.asPath === "/tickets",
    },
    {
      name: "Assigned to me",
      href: "?filter=assigned",
      //   count: "6",
      current: router.asPath === "/tickets?filter=assigned",
    },
    {
      name: "Unassigned",
      href: "?filter=unassigned",
      //   count: "4",
      current: router.asPath === "/tickets?filter=unassigned",
    },
    {
      name: "Closed",
      href: "?filter=closed",
      //   count: "",
      current: router.asPath === "/tickets?filter=closed",
    },
  ];

  console.log(router);

  return (
    <div>
      {loading && (
        <div className="flex flex-col justify-center items-center h-screen">
          <Loader color="green" size={100} />
        </div>
      )}

      {!loading && (
        <>
          <div>
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                defaultValue={tabs.find((tab) => tab.current).name}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <Link
                      key={tab.name}
                      href={tab.href}
                      className={classNames(
                        tab.current
                          ? "border-indigo-500 text-indigo-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200",
                        "whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm"
                      )}
                      aria-current={tab.current ? "page" : undefined}
                    >
                      {tab.name}
                      {tab.count ? (
                        <span
                          className={classNames(
                            tab.current
                              ? "bg-indigo-100 text-indigo-600"
                              : "bg-gray-100 text-gray-900",
                            "hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block"
                          )}
                        >
                          {tab.count}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>

            <div className="mt-4">
              {router.asPath === "/tickets" && <OpenTickets />}
              {router.asPath === "/tickets?filter=assigned" && (
                <AssignedTickets />
              )}
              {router.asPath === "/tickets?filter=unassigned" && (
                <UnassignedTickets />
              )}
              {router.asPath === "/tickets?filter=closed" && <ClosedTickets />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
