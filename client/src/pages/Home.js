/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from "react";
import {
  CheckCircleIcon,
  OfficeBuildingIcon,
  ArrowRightIcon,
} from "@heroicons/react/solid";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import ListTodo from "../components/todos/ListTodo";
import Files from "../components/home/Files";

import { GlobalContext } from "../Context/GlobalState";

const UserDash = () => {
  const { addTodo, todos } = useContext(GlobalContext);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || ""
  );
  const [openTickets, setOpenTickets] = useState();
  const [completedTickets, setCompletedTickets] = useState();
  const [file, setFile] = useState([]);
  const [hour, setHour] = useState("");

  const [text, setText] = useState("");

  const onSubmit = () => {
    addTodo(text);
  };

  async function time() {
    const date = new Date();
    const hour = date.getHours();
    setHour(hour);
  }

  async function getOpenTickets() {
    await fetch(`/api/v1/data/openTickets`, {
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
    await fetch(`/api/v1/data/completedTickets`, {
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

  const propsUpload = {
    name: "file",
    action: `/api/v1/auth/uploadFile/upload`,
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

  const stats = [
    { name: "Open Tickets", stat: openTickets, href: "/tickets" },
    { name: "Completed Tickets", stat: completedTickets, href: "/history" },
    { name: "Total Todos", stat: todos.length },
  ];

  return (
    <div className="min-h-screen">
      <main className="p-1">
        {/* Page header */}
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="flex-1 min-w-0">
                {/* Profile */}
                <div className="flex items-center">
                  <span className="hidden sm:inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-500">
                    <span className="text-lg font-medium leading-none text-white">
                      {user.firstName[0] + user.lastName[0]}
                    </span>
                  </span>
                  <div>
                    <div className="flex items-center">
                      <span className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-gray-500 sm:hidden">
                        <span className="text-lg font-medium leading-none text-white">
                          {user.firstName[0] + user.lastName[0]}
                        </span>
                      </span>
                      <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                        Good {hour < 12 ? "Morning" : "Afternoon"},{" "}
                        {user.firstName + " " + user.lastName}!
                      </h1>
                    </div>
                    <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                      <dt className="sr-only">Company</dt>
                      <dd className="flex items-center text-sm text-gray-500 font-medium capitalize sm:mr-6">
                        <OfficeBuildingIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        Duke street studio
                      </dd>
                      <dt className="sr-only">Account status</dt>
                      <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        <CheckCircleIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                          aria-hidden="true"
                        />
                        {user.isAdmin ? "Admin" : "Engineer"}
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
            ))}
          </dl>
        </div>

        <div className="flex flex-col mt-5 2xl:flex-row">
          <div className="flex-1">
            <div className="bg-white shadow w-full h-full sm:rounded-lg">
              <div className="px-2 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-4">
                <div className="px-2 py-5 sm:p-6">
                  <div>
                    <h1 className="font-bold leading-7 text-gray-900">
                      Todo List
                    </h1>
                  </div>
                  <div className="flex flex-row items-center w-full">
                    <div className="mt-1 relative shadow-sm w-full">
                      <input
                        type="text"
                        name="text"
                        id="text"
                        className="w-full text-gray-900 border-none focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                        placeholder="Enter todo here..."
                        onChange={(e) => {
                          setText(e.target.value);
                        }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => onSubmit()}
                      className="sm:-mr-10"
                    >
                      <ArrowRightIcon className="h-6 w-6" />
                    </button>
                  </div>
                  <ListTodo />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 sm:mt-4 w-full 2xl:ml-2 2xl:mt-0">
            <div className="bg-white overflow-hidden shadow h-full sm:rounded-lg">
              <div className="px-2 py-5 sm:p-6 flex flex-row">
                <h2
                  className="font-bold leading-7 text-gray-900"
                  id="recent-hires-title"
                >
                  Personal Files
                </h2>
                <Upload
                  {...propsUpload}
                  className="px-4 flex flex-row align-middle items-center -mt-3"
                >
                  <button>
                    <UploadOutlined />
                  </button>
                </Upload>
              </div>
              <Files />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDash;
