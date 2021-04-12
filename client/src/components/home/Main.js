import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import Active from "../newsletter/Active";
import ListNote from "../notes/ListNote";
import CreateTodo from "../todos/CreateTodo";
import ListTodo from "../todos/ListTodo";
import Files from './Files'

const Main = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || '');
  const [openTickets, setOpenTickets] = useState();
  const [completedTickets, setCompletedTickets] = useState();
  const [unissuedTickets, setUnissuedTickets] = useState();
  const [file, setFile] = useState([]);

  async function getOpenTickets() {
    await fetch(`/api/v1/data/openTickets`, {
      method: "get",
      headers: {
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setOpenTickets(result.result);
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
      .then((result) => {
        setCompletedTickets(result.result);
      });
  }

  async function getUnissuedTickets() {
    await fetch(`/api/v1/data/unallocatedTickets`, {
      method: "get",
      headers: {
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setUnissuedTickets(result.result);
      });
  }

  useEffect(() => {
    getOpenTickets();
    getCompletedTickets();
    getUnissuedTickets();
  }, []);

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

  return (
    <div>
      <main className="-mt-16 pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <h1 className="sr-only">Profile</h1>
          <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <section aria-labelledby="profile-overview-title">
                <div className="rounded-lg bg-white overflow-hidden shadow">
                  <h2 className="sr-only" id="profile-overview-title">
                    Profile Overview
                  </h2>
                  <div className="bg-white p-6">
                    <div className="sm:flex sm:items-center sm:justify-between">
                      <div className="sm:flex sm:space-x-5">
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-gray-500">
                            <span className="text-xl font-medium leading-none text-white">
                              {user ? user.name[0] : ''}
                            </span>
                          </span>
                        </div>
                        <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                          <p className="text-sm font-medium text-gray-600">
                            Welcome back,
                          </p>
                          <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                            {user.name || ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-3 sm:divide-y-0 sm:divide-x">
                    <Link to='/tickets'>
                    <div className="px-6 py-5 text-sm font-medium text-center">
                      <span className="text-gray-900">{openTickets} </span>
                      <span className="text-gray-600">Tickets Open</span>
                    </div>
                    </Link>

                    <Link to='/tickets'>
                    <div className="px-6 py-5 text-sm font-medium text-center">
                      <span className="text-gray-900">{unissuedTickets} </span>
                      <span className="text-gray-600">Tickets Unissued</span>
                    </div>
                    </Link>

                    <Link to='/history'>
                    <div className="px-6 py-5 text-sm font-medium text-center">
                      <span className="text-gray-900">{completedTickets} </span>
                      <span className="text-gray-600">Tickets Completed</span>
                    </div>
                    </Link>
                  </div>
                </div>
              </section>

              <section aria-labelledby="quick-links-title">
                <div className="rounded-lg  overflow-hidden s sm:divide-y-0 sm:gap-px">
                  <h2 className="sr-only" id="quick-links-title">
                    Notes and Tasks
                  </h2>
                  <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                      <li className="px-4 py-4 sm:px-6">
                        <CreateTodo />
                        <ListTodo />
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white shadow overflow-hidden sm:rounded-md mt-5">
                    <ul className="divide-y divide-gray-200">
                      <li className="px-4 py-4 sm:px-6">
                        <ListNote />
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <section aria-labelledby="announcements-title">
                <div className="rounded-lg bg-white overflow-hidden shadow">
                  <div className="p-6">
                    <h2
                      className="text-base font-medium text-gray-900"
                      id="announcements-title"
                    >
                      Announcements
                    </h2>
                    <Active />
                  </div>
                </div>
              </section>

              <section aria-labelledby="recent-hires-title">
                <div className="rounded-lg bg-white overflow-hidden shadow">
                  <div className="p-6 flex flex-col">
                    <h2
                      className="text-base font-medium text-gray-900"
                      id="recent-hires-title"
                    >
                      Personal Files
                    </h2>
                    <Upload {...propsUpload} className="mb-3" >
                      <button><UploadOutlined /></button>
                    </Upload>
                  </div>
                  <Files />
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Main;
