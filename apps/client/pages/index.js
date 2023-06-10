import { useState, useEffect, Fragment } from "react";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
  CheckCircleIcon,
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";

import useTranslation from "next-translate/useTranslation";

import ListTodo from "../components/ListTodo";
import ListUserFiles from "../components/ListUserFiles";
import { useRouter } from "next/router";
import moment from "moment";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const { data: session } = useSession();

  const router = useRouter();

  const [hour, setHour] = useState();
  const [openTickets, setOpenTickets] = useState(0);
  const [completedTickets, setCompletedTickets] = useState(0);
  const [unassigned, setUnassigned] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState();

  const { t } = useTranslation("peppermint");

  let file = [];

  async function time() {
    const date = new Date();
    const hour = date.getHours();
    setHour(hour);
  }

  async function getOpenTickets() {
    await fetch(`/api/v1/data/count/open-tickets`, {
      method: "get",
      headers: {
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setOpenTickets(res.result);
      });
  }

  async function getCompletedTickets() {
    await fetch(`/api/v1/data/count/completed-tickets`, {
      method: "get",
      headers: {
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setCompletedTickets(res.result);
      });
  }

  async function getUnassginedTickets() {
    await fetch(`/api/v1/data/count/all/unissued`, {
      method: "get",
      headers: {
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setUnassigned(res.result);
      });
  }

  async function fetchTickets() {
    await fetch(`/api/v1/ticket/open`, {
      method: "get",
      headers: {
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
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
      name: "Unassigned Tickets",
      stat: unassigned,
      href: "/tickets?filter=unassigned",
    },
  ];

  const propsUpload = {
    name: "file",
    action: `/api/v1/users/file/upload`,
    data: () => {
      let data = new FormData();
      data.append("file", file);
      data.append("filename", file.name);
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        setUploaded(true);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => `${parseFloat(percent.toFixed(2))}%`,
    },
  };

  async function datafetch() {
    fetchTickets();
    getOpenTickets();
    getCompletedTickets();
    getUnassginedTickets();
    await setLoading(false);
  }

  useEffect(() => {
    time();
    datafetch();
  }, []);

  return (
    <div className="flex flex-col xl:flex-row min-h-[85vh]">
      <div className="w-full xl:w-[70%]">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 sm:px-6 lg:w-full lg:mx-auto lg:px-8">
            <div className="py-1 md:flex md:items-center md:justify-between">
              <div className="flex-1 min-w-0">
                {/* Profile */}
                <div className="flex items-center">
                  <span className="hidden sm:inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-500">
                    <span className="text-lg font-medium leading-none text-white uppercase">
                      {session.user.name[0]}
                    </span>
                  </span>
                  <div>
                    <div className="flex items-center">
                      <span className="pt-4 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                        {t("hello_good")}
                        {hour < 12
                          ? t("hello_morning")
                          : t("hello_afternoon")}, {session.user.name}!
                      </span>
                    </div>
                    <dl className="flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">{t("account_status")}</dt>
                      <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        <CheckCircleIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                          aria-hidden="true"
                        />
                        {session.user.isAdmin ? "Admin" : "user"}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {!loading && (
          <>
            <div>
              <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {stats.map((item) => (
                  <Link href={item.href}>
                    <div
                      key={item.name}
                      className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
                    >
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {item.name}
                      </dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">
                        {item.stat}
                      </dd>
                    </div>
                  </Link>
                ))}
              </dl>
            </div>

            <div className="flex w-full flex-col ">
              <span className="font-bold text-2xl">Recent Tickets</span>
              <div className="-mx-4 sm:-mx-0 w-full">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                      >
                        Priority
                      </th>
                      <th
                        scope="col"
                        className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Opened
                      </th>

                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Assigned
                      </th>
                      {/* <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Actions</span>
                      </th> */}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {tickets !== undefined &&
                      tickets.slice(0, 10).map((item) => (
                        <tr
                          key={item.id}
                          className="hover:bg-gray-300 hover:cursor-pointer"
                          onClick={() => router.push(`/tickets/${item.id}`)}
                        >
                          <td className="w-full sm:max-w-[280px] 2xl:max-w-[720px] truncate py-1 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
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
                              <span className="inline-flex w-full justify-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
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
                                  Closed
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
                                  Open
                                </span>
                              </>
                            )}
                          </td>
                          <td className="px-3 py-1 text-sm text-gray-500 w-[160px]">
                            {moment(item.createdAt).format('DD/MM/YYYY')}
                          </td>
                          <td className="px-3 py-1 text-sm text-gray-500 w-[64px]">
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
            </div>
          </>
        )}
      </div>
      <div className="flex-1 xl:ml-4 bg-white px-2 rounded-lg shadow-md pt-2 max-h-[53vh]">
        <span className="font-bold text-2xl">Reminders</span>
        <ListTodo />
      </div>
    </div>
  );
}
