import { useState, useEffect } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";

import ListTodo from "../components/ListTodo";
import ListUserFiles from "../components/ListUserFiles";

export default function Home() {
  const { data: session } = useSession();

  const [hour, setHour] = useState();
  const [openTickets, setOpenTickets] = useState(0);
  const [completedTickets, setCompletedTickets] = useState(0);
  const [uploaded, setUploaded] = useState(false);

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

  const stats = [
    { name: "Open Tickets", stat: openTickets, href: "/ticket" },
    { name: "Completed Tickets", stat: completedTickets, href: "/history" },
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

  useEffect(() => {
    getOpenTickets();
    getCompletedTickets();
    time();
  }, []);

  return (
    <div>
      <main className="p-1">
        {/* Page header */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between">
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
                      <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                        Good {hour < 12 ? "Morning" : "Afternoon"},{" "}
                        {session.user.name}!
                      </h1>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Account status</dt>
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

        <div>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map((item) => (
              <Link href={item.href}>
                <a>
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
                </a>
              </Link>
            ))}
          </dl>
        </div>

        <div className="flex sm:flex-row mt-5 flex-nowrap flex-col gap-4">
          <div className="flex w-full sm:w-3/5">
            <div className="bg-white shadow w-full h-full sm:rounded-lg">
              <div className="px-2 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-4">
                <div className="px-2 py-5 sm:p-6">
                  <div>
                    <h1 className="font-bold leading-7 text-gray-900">
                      Todo List
                    </h1>
                  </div>
                  <ListTodo />
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full sm:w-2/5">
            <div className="bg-white shadow w-full h-full sm:rounded-lg">
              <div className="px-2 py-5 sm:p-6 flex flex-row">
                <h2
                  className="font-bold leading-7 text-gray-900"
                  id="recent-hires-title"
                >
                  Personal Files
                </h2>
                <Upload
                  {...propsUpload}
                  className="px-4 flex align-middle items-center -mt-3"
                >
                  <button>
                    <UploadOutlined />
                  </button>
                </Upload>
              </div>
              <ListUserFiles uploaded={uploaded} setUploaded={() => setUploaded()} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
