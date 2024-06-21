import { useEffect, useState } from "react";

import useTranslation from "next-translate/useTranslation";

import { useRouter } from "next/router";

import { getCookie } from "cookies-next";
import moment from "moment";
import { useUser } from "../../store/session";

export default function Home() {
  const router = useRouter();
  const { t } = useTranslation("peppermint");

  const { user } = useUser();
  const token = getCookie("session");

  const [openTickets, setOpenTickets] = useState(0);
  const [completedTickets, setCompletedTickets] = useState(0);
  const [unassigned, setUnassigned] = useState(0);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<any>();

  async function fetchTickets() {
    await fetch(`/api/v1/tickets/user/open`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTickets(res.tickets);
      });
  }

  async function datafetch() {
    fetchTickets();
    await setLoading(false);
  }

  useEffect(() => {
    datafetch();
  }, []);

  return (
    <div className="flex flex-col xl:flex-row p-8 justify-center w-full">
      <div className="w-full xl:w-[70%] max-w-5xl">
        {!loading && (
          <>
            <div className="flex w-full flex-col mt-4 px-1 mb-4">
              {tickets !== undefined && tickets.length === 0 ? (
                <>
                  <button
                    type="button"
                    className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => router.push("/portal/new")}
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
                              {/* <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <div>
                              <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                                Options
                                <ChevronDownIcon
                                  className="-mr-1 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "group flex items-center px-4 py-2 text-sm"
                                        )}
                                      >
                                        <PencilSquareIcon
                                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                        Edit
                                      </a>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "group flex items-center px-4 py-2 text-sm"
                                        )}
                                      >
                                        <DocumentDuplicateIcon
                                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                        Duplicate
                                      </a>
                                    )}
                                  </Menu.Item>
                                </div>
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "group flex items-center px-4 py-2 text-sm"
                                        )}
                                      >
                                        <ArchiveBoxIcon
                                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                        Archive
                                      </a>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "group flex items-center px-4 py-2 text-sm"
                                        )}
                                      >
                                        <ArrowRightCircleIcon
                                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                        Move
                                      </a>
                                    )}
                                  </Menu.Item>
                                </div>
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "group flex items-center px-4 py-2 text-sm"
                                        )}
                                      >
                                        <UserPlusIcon
                                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                        Share
                                      </a>
                                    )}
                                  </Menu.Item>
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "group flex items-center px-4 py-2 text-sm"
                                        )}
                                      >
                                        <HeartIcon
                                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                        Add to favorites
                                      </a>
                                    )}
                                  </Menu.Item>
                                </div>
                                <div className="py-1">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        href="#"
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "group flex items-center px-4 py-2 text-sm"
                                        )}
                                      >
                                        <TrashIcon
                                          className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                          aria-hidden="true"
                                        />
                                        Delete
                                      </a>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </td> */}
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
      {/* <div className="flex-1 xl:ml-4 bg-white px-2 rounded-lg shadow-md pt-2 2xl:max-h-[53vh]">
        <span className="font-bold text-2xl ml-1">{t("reminders")}</span>
        <ListTodo />
      </div> */}
    </div>
  );
}
