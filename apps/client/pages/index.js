import { useState, useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";

import useTranslation from "next-translate/useTranslation";

import ListTodo from "../components/ListTodo";
import ListUserFiles from "../components/ListUserFiles";

export default function Home() {
  const { data: session } = useSession();

  const [hour, setHour] = useState();
  const [openTickets, setOpenTickets] = useState(0);
  const [completedTickets, setCompletedTickets] = useState(0);
  const [unassigned, setUnassigned] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [loading, setLoading] = useState(true);

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

  const people = [
    {
      name: "Lindsay Walton",
      title: "Front-end Developer",
      email: "lindsay.walton@example.com",
      role: "Member",
    },
    // More people...
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
    <div className="flex flex-row min-h-[85vh]">
      <div className="w-[70%]">
        <div className="bg-white shadow">
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
                      <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-500 sm:hidden">
                        <span className="text-lg font-medium leading-none text-white uppercase">
                          {session.user.name[0]}
                        </span>
                      </span>
                      <span className="ml-3 pt-4 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
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
                        Type
                      </th>
                      <th
                        scope="col"
                        className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                      >
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 ">
                    {people.map((person) => (
                      <tr key={person.email}>
                        <td className="w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                          {person.name}
                          <dl className="font-normal lg:hidden">
                            <dt className="sr-only">Title</dt>
                            <dd className="mt-1 truncate text-gray-700">
                              {person.title}
                            </dd>
                            <dt className="sr-only sm:hidden">Email</dt>
                            <dd className="mt-1 truncate text-gray-500 sm:hidden">
                              {person.email}
                            </dd>
                          </dl>
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell">
                          {person.title}
                        </td>
                        <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                          {person.email}
                        </td>
                        <td className="px-3 py-4 text-sm text-gray-500">
                          {person.role}
                        </td>
                        <td className="py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0"></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex-1 p-2">
        <span className="font-bold text-2xl">Todo's</span>
        <ListTodo />
      </div>
    </div>
  );
}
