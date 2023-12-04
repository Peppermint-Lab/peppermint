import useTranslation from "next-translate/useTranslation";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Loader from "react-spinners/ClipLoader";

import TicketsAdminLayout from "../../components/TicketViews/admin";
import AssignedTickets from "../../components/TicketViews/assigned";
import ClosedTickets from "../../components/TicketViews/closed";
import OpenTickets from "../../components/TicketViews/open";
import UnassignedTickets from "../../components/TicketViews/unassiged";
import { useUser } from "../../store/session";

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Tickets() {
  const router = useRouter();
  const { t } = useTranslation("peppermint");

  const [loading, setLoading] = useState(false);

  const user = useUser();

  const tabs = [
    {
      name: t("open"),
      href: "/tickets",
      //   count: "",
      current: router.asPath === "/tickets",
    },
    {
      name: t("assigned_to_me"),
      href: "?filter=assigned",
      //   count: "6",
      current: router.asPath === "/tickets?filter=assigned",
    },
    {
      name: t("unassigned"),
      href: "?filter=unassigned",
      //   count: "4",
      current: router.asPath === "/tickets?filter=unassigned",
    },
    {
      name: t("closed"),
      href: "?filter=closed",
      //   count: "",
      current: router.asPath === "/tickets?filter=closed",
    },
  ];

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
              <select
                id="tabs"
                name="tabs"
                className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                defaultValue={tabs[0].name}
              >
                {tabs.map((tab) => (
                  <>
                    <option key={tab.name}>{tab.name}</option>
                    {user.isAdmin && <option key="admin">ADMIN</option>}
                  </>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <>
                      <Link
                        key={tab.name}
                        href={tab.href}
                        className={classNames(
                          tab.current
                            ? "border-indigo-500 text-indigo-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200",
                          "whitespace-nowrap flex py-2 px-1 border-b-2 font-medium text-sm"
                        )}
                        aria-current={tab.current ? "page" : undefined}
                      >
                        {tab.name}
                        {/* {tab.count ? (
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
                      ) : null} */}
                      </Link>
                    </>
                  ))}
                  <Link
                    key="admin"
                    href="?filter=admin"
                    className={classNames(
                      router.asPath === "/tickets?filter=admin"
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200",
                      "whitespace-nowrap flex py-2 px-1 border-b-2 font-medium text-sm"
                    )}
                  >
                    admin
                  </Link>
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
              {router.asPath === "/tickets?filter=admin" && (
                <TicketsAdminLayout />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
