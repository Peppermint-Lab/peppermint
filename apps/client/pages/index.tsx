import Link from "next/link";
import { useEffect, useState } from "react";

import useTranslation from "next-translate/useTranslation";

import { useRouter } from "next/router";

import { getCookie } from "cookies-next";
import moment from "moment";
import { useUser } from "../store/session";

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation("peppermint");

  const { user } = useUser();
  const token = getCookie("session");

  const [hour, setHour] = useState<number>();
  const [openTickets, setOpenTickets] = useState(0);
  const [completedTickets, setCompletedTickets] = useState(0);
  const [unassigned, setUnassigned] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<any>();

  let file: any;

  async function time() {
    const date = new Date();
    const hour = date.getHours();
    setHour(hour);
  }

  async function getOpenTickets() {
    await fetch(`/api/v1/data/tickets/open`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setOpenTickets(res.count);
      });
  }

  async function getCompletedTickets() {
    await fetch(`/api/v1/data/tickets/completed`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCompletedTickets(res.count);
      });
  }

  async function getUnassginedTickets() {
    await fetch(`/api/v1/data/tickets/unassigned`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUnassigned(res.count);
      });
  }

  async function fetchTickets() {
    await fetch(`/api/v1/tickets/open`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTickets(res.tickets);
      });
  }

  const stats = [
    { name: t("open_tickets"), stat: openTickets, href: "/tickets" },
    {
      name: t("completed_tickets"),
      stat: completedTickets,
      href: "/tickets?filter=closed",
    },
    {
      name: t("unassigned_tickets"),
      stat: unassigned,
      href: "/tickets?filter=unassigned",
    },
  ];

  async function datafetch() {
    Promise.all([
      fetchTickets(),
      getOpenTickets(),
      getCompletedTickets(),
      getUnassginedTickets()
    ])
    await setLoading(false);
  }

  useEffect(() => {
    time();
    datafetch();
  }, []);

  return (
    <div className="flex flex-col xl:flex-row p-8 justify-center w-full">
      <div className="w-full xl:w-[70%] max-w-5xl">
        {!loading && (
          <>
            <div>
              <dl className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((item) => (
                  <Link href={item.href}>
                    <div
                      key={item.name}
                      className="px-4 py-5 bg-gray-900 shadow rounded-lg overflow-hidden sm:p-6"
                    >
                      <dt className="text-sm font-medium text-white truncate">
                        {item.name}
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-white">
                        {item.stat}
                      </dd>
                    </div>
                  </Link>
                ))}
              </dl>
            </div>

            <div className="flex w-full flex-col mt-4 px-1 mb-4">
              {tickets !== undefined && tickets.length === 0 ? (
                <>
                  <button
                    type="button"
                    className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => router.push("/new")}
                  >
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400 dark:text-white"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                      />
                    </svg>
                    <span className="mt-2 block text-sm font-semibold text-gray-900 dark:text-white">
                      Create your first ticket
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <span className="font-bold text-2xl">
                    {t("recent_tickets")}
                  </span>
                  <div className="-mx-4 sm:-mx-0 w-full">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead>
                        <tr>
                          <th
                            scope="col"
                            className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:pl-0"
                          >
                            {t("title")}
                          </th>
                          <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white lg:table-cell"
                          >
                            {t("priority")}
                          </th>
                          <th
                            scope="col"
                            className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white sm:table-cell"
                          >
                            {t("status")}
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                          >
                            {t("created")}
                          </th>

                          <th
                            scope="col"
                            className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-white"
                          >
                            {t("assigned_to")}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {tickets !== undefined &&
                          tickets.slice(0, 10).map((item: any) => (
                            <tr
                              key={item.id}
                              className="hover:bg-gray-300 dark:hover:bg-green-600 hover:cursor-pointer"
                              onClick={() => router.push(`/ticket/${item.id}`)}
                            >
                              <td className="sm:max-w-[280px] 2xl:max-w-[720px] truncate py-1 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white sm:pl-0">
                                {item.title}
                                <dl className="font-normal lg:hidden">
                                  <dt className="sr-only sm:hidden">Email</dt>
                                  <dd className="mt-1 truncate text-gray-500 sm:hidden">
                                    {item.email}
                                  </dd>
                                </dl>
                              </td>
                              <td className="hidden px-3 py-1 text-sm text-gray-500 lg:table-cell w-[64px]">
                                {item.priority === "Low" && (
                                  <span className="inline-flex w-full justify-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700  ring-1 ring-inset ring-blue-600/20">
                                    {item.priority}
                                  </span>
                                )}
                                {item.priority === "Normal" && (
                                  <span className="inline-flex items-center w-full justify-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                                    {item.priority}
                                  </span>
                                )}
                                {item.priority === "High" && (
                                  <span className="inline-flex items-center w-full justify-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                                    {item.priority}
                                  </span>
                                )}
                              </td>
                              <td className="hidden px-3 py-1 text-sm text-gray-500 sm:table-cell w-[64px]">
                                {item.isComplete === true ? (
                                  <div>
                                    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                                      <svg
                                        className="h-1.5 w-1.5 fill-red-500"
                                        viewBox="0 0 6 6"
                                        aria-hidden="true"
                                      >
                                        <circle cx={3} cy={3} r={3} />
                                      </svg>
                                      {t("closed")}
                                    </span>
                                  </div>
                                ) : (
                                  <>
                                    <span className="inline-flex items-center gap-x-1.5 rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                      <svg
                                        className="h-1.5 w-1.5 fill-green-500"
                                        viewBox="0 0 6 6"
                                        aria-hidden="true"
                                      >
                                        <circle cx={3} cy={3} r={3} />
                                      </svg>
                                      {t("open")}
                                    </span>
                                  </>
                                )}
                              </td>
                              <td className="px-3 py-1 text-sm text-gray-500 dark:text-white w-[110px]">
                                {moment(item.createdAt).format("DD/MM/YYYY")}
                              </td>
                              <td className="px-3 py-1 text-sm text-gray-500 w-[130px] dark:text-white truncate whitespace-nowrap">
                                {item.assignedTo ? item.assignedTo.name : "-"}
                              </td>
                             
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

    </div>
  );
}
