import React, { useState, useEffect, Fragment } from "react";
import { message, Upload, Divider } from "antd";
import moment from "moment";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";

import TicketFiles from "../TicketFiles";
import ClientNotesModal from "../ClientNotesModal";
import TransferTicket from "../TransferTicket";
import TipTapEditor from "../TipTapEditor";
import renderHTML from "react-render-html";
import LinkTicket from "../LinkTicketModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function TicketDetail(props) {
  const [ticket, setTicket] = useState(props.ticket);
  const [edit, setEdit] = useState(false);

  const [note, setNote] = useState(props.ticket.note);
  const [issue, setIssue] = useState(props.ticket.detail);
  const [title, setTitle] = useState(props.ticket.title);
  const [name, setName] = useState(props.ticket.name);
  const [email, setEmail] = useState(props.ticket.email);
  const [number, setNumber] = useState(props.ticket.number);
  const [badge, setBadge] = useState("");
  const [uploaded, setUploaded] = useState();
  const [priority, setPriority] = useState(props.ticket.priority);

  const history = useRouter();

  const { id } = history.query;

  let file = [];

  useEffect(() => {
    if (ticket.priority === "Low") {
      setBadge(low);
    }
    if (ticket.priority === "Normal") {
      setBadge(normal);
    }
    if (ticket.priority === "High") {
      setBadge(high);
    }
  }, []);

  async function update() {
    await fetch(`/api/v1/ticket/${id}/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        detail: issue,
        note,
        title,
        priority,
      }),
    })
      .then((res) => res.json())
      .then(() => history.reload());
  }

  async function updateStatus() {
    await fetch(`/api/v1/ticket/${id}/update-status`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: !props.ticket.isComplete,
      }),
    })
      .then((res) => res.json())
      .then(() => history.reload());
  }

  const propsUpload = {
    name: "file",
    showUploadList: false,
    action: `/api/v1/ticket/${id}/file/upload`,
    data: () => {
      let data = new FormData();
      data.append("file", file);
      data.append("filename", file.name);
      data.append("ticket", ticket.id);
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

  const high = "bg-red-100 text-red-800";
  const low = "bg-blue-100 text-blue-800";
  const normal = "bg-green-100 text-green-800";

  return (
    <div>
      <div className="relative">
        <div className="py-8 xl:py-10">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-5xl xl:grid xl:grid-cols-3 2xl:max-w-full">
            <div className="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
              <div>
                <div>
                  <div className="flex flex-row md:items-center justify-between md:space-x-4 xl:border-b xl:pb-6">
                    <div className="">
                      <span
                        className={
                          edit ? "hidden" : "text-2xl font-bold text-gray-900"
                        }
                      >
                        {title ? title : "No Title"}
                      </span>
                      <input
                        type="text"
                        maxLength={64}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className={
                          edit
                            ? "shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                            : "hidden"
                        }
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">
                          opened by user: {ticket.name}
                        </span>
                        <span className="text-sm font-bold">
                          client: {ticket.client ? ticket.client.name : ""}
                        </span>
                      </div>
                    </div>
                    <div>
                      <Menu
                        as="div"
                        className="relative inline-block text-left"
                      >
                        <div>
                          <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            Actions
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
                              {/* <Menu.Item>
                                {({ active }) => (
                                  <Upload {...propsUpload}>
                                    <button
                                      href="#"
                                      className={classNames(
                                        active
                                          ? "bg-gray-100 text-gray-900"
                                          : "text-gray-700",
                                        "group flex items-center px-4 py-2 text-sm"
                                      )}
                                    >
                                      <svg
                                        className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                        />
                                      </svg>
                                      Upload
                                    </button>
                                  </Upload>
                                )}
                              </Menu.Item> */}
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) =>
                                  ticket.isComplete === false ? (
                                    <button
                                      onClick={async () => {
                                        await updateStatus();
                                        history.reload(history.pathname);
                                      }}
                                      type="button"
                                      className="group flex items-center px-4 py-2 text-sm group-hover:text-gray-500 hover:bg-gray-100 w-full"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <span className="text-gray-500">
                                        Close
                                      </span>
                                    </button>
                                  ) : (
                                    <button
                                      onClick={async () => {
                                        await updateStatus();
                                        history.reload(history.pathname);
                                      }}
                                      type="button"
                                      className="group flex items-center px-4 py-2 text-sm group-hover:text-gray-500 hover:bg-gray-100 w-full"
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <span className="text-gray-500">
                                        Open
                                      </span>
                                    </button>
                                  )
                                }
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) =>
                                  ticket.client ? (
                                    <ClientNotesModal
                                      notes={props.ticket.client.notes}
                                      id={props.ticket.client.id}
                                    />
                                  ) : null
                                }
                              </Menu.Item>
                            </div>
                            <div className="py-1">
                              <Menu.Item>
                                {({ active }) => (
                                  <TransferTicket id={props.ticket.id} />
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
                                    Link
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>

                  <div className="py-3 xl:pt-6 xl:pb-0 ">
                    <h1 className="text-xl">Issue</h1>
                    <div className={edit ? "hidden" : "prose max-w-none"}>
                      {issue ? (
                        renderHTML(issue)
                      ) : (
                        <span>
                          No issue has been entered yet ... Click edit to enter
                          an issue
                        </span>
                      )}
                    </div>
                    <div className={edit ? "prose max-w-none" : "hidden"}>
                      <TipTapEditor value={issue} setContent={setIssue} />
                    </div>
                  </div>
                </div>
              </div>
              <section
                aria-labelledby="activity-title"
                className="mt-8 xl:mt-10"
              >
                <div className="pb-4">
                  <h2
                    id="activity-title"
                    className="text-lg font-medium text-gray-900"
                  >
                    Activity
                  </h2>
                  <div className="flow-root -mt-4"></div>
                </div>
                <div className={edit ? "hidden" : "mt-3"}>
                  {note ? (
                    renderHTML(note)
                  ) : (
                    <span>No work has been entered yet</span>
                  )}
                </div>
                <div className={edit ? "mt-3" : "hidden"}>
                  <TipTapEditor value={note} setContent={setNote} />
                </div>
              </section>
            </div>

            <aside className="hidden xl:block xl:pl-8">
              <h2 className="sr-only">Details</h2>
              <div className="space-y-5">
                <div className="flex items-center">
                  {ticket.isComplete ? (
                    <div className="flex flex-row space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-red-500 text-sm font-bold">
                        Completed
                      </span>
                    </div>
                  ) : (
                    <div className="flex-row flex space-x-2">
                      <svg
                        className="h-5 w-5 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                      </svg>
                      <span className="text-green-700 text-sm font-medium ">
                        Issued
                      </span>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {!edit && (
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge}`}
                    >
                      {ticket.priority}
                    </span>
                  )}
                  {edit && (
                    <div>
                      <select
                        id="location"
                        name="location"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        defaultValue={ticket.priority}
                        onChange={(e) => setPriority(e.target.value)}
                      >
                        <option value="Low">Low</option>
                        <option value="Normal">Normal</option>
                        <option value="High">High</option>
                      </select>
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-900 text-sm font-medium">
                    Created on{" "}
                    <span>{moment(ticket.createdAt).format("DD/MM/YYYY")}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-900 text-sm font-medium">
                    Last updated{" "}
                    <span>{moment(ticket.updatedAt).format("DD/MM/YYYY")}</span>
                  </span>
                </div>
              </div>
              <div className="mt-6 border-t border-gray-200 py-6 space-y-8">
                <div>
                  <h2 className="text-sm font-medium text-gray-500">
                    Assignees
                  </h2>
                  <ul className="mt-3 space-y-3">
                    <li className="flex justify-start">
                      <p href="#" className="flex items-center space-x-3">
                        <div className="text-sm font-medium text-gray-900">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500">
                            <span className="font-medium leading-none text-white">
                              {ticket.assignedTo
                                ? ticket.assignedTo.name[0]
                                : ""}
                            </span>
                          </span>
                        </div>
                        <span>
                          {ticket.assignedTo
                            ? ticket.assignedTo.name
                            : "Not currently assigned"}
                        </span>
                      </p>
                    </li>
                  </ul>
                  <Divider className="bg-gray-200" />
                </div>
              </div>
              <div className="-mt-10">
                <div className="flex flex-col">
                  <TicketFiles
                    id={id}
                    uploaded={uploaded}
                    setUploaded={setUploaded}
                  />
                </div>
              </div>
              <div className="mt-10">
                <div>
                  <Divider className="bg-gray-200" />
                  <h2 className="text-sm font-medium text-gray-500">
                    Contact Details
                  </h2>
                  <div className="flex flex-col">
                    {ticket.client ? (
                      <>
                        <span>Name - {ticket.name}</span>
                        <span>Email - {ticket.email} </span>
                        <span>
                          Number - {ticket.client ? ticket.client.number : ""}{" "}
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="mt-10">
                <div>
                  <Divider className="bg-gray-200" />
                  <h2 className="text-sm font-medium text-gray-500">
                    Linked Tickets
                  </h2>
                  <div className="flex flex-col">
                    {ticket.linked &&
                      Object.entries(ticket.linked).length > 0 &&
                      Object.entries(ticket.linked).map((ticket) => (
                        <span>
                          {ticket[1].title} - #{ticket[1].id}
                        </span>
                      ))}
                    {ticket.linked === null && <span>No linked tickets</span>}
                  </div>
                </div>
              </div>
            </aside>

            <aside className="mt-8 xl:hidden">
              <h2 className="sr-only">Details</h2>
              <div className="space-y-5">
                <div className="flex items-center space-x-2">
                  <svg
                    className="h-5 w-5 text-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                  </svg>
                  <span className="text-green-700 text-sm font-medium">
                    {ticket.isComplete ? "Completed" : "Issued"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    {ticket.assignedTo
                      ? ticket.assignedTo.name
                      : "Not currently assigned"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-900 text-sm font-medium">
                    Created on{" "}
                    <span>{moment(ticket.createdAt).format("DD/MM/YYYY")}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-900 text-sm font-medium">
                    Last updated{" "}
                    <span>{moment(ticket.updatedAt).format("DD/MM/YYYY")}</span>
                  </span>
                </div>
              </div>
              <div className="mt-6 border-t border-b border-gray-200 py-6 space-y-8">
                <div>
                  <h2 className="text-sm font-medium text-gray-500">
                    Assignees
                  </h2>
                  <ul className="mt-3 space-y-3">
                    <li className="flex justify-start">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500">
                            <span className="font-medium leading-none text-white">
                              {ticket.assignedTo
                                ? ticket.assignedTo.name[0]
                                : ""}
                            </span>
                          </span>
                        </div>
                        <div className="text-sm font-medium text-gray-900">
                          <span>
                            {" "}
                            {ticket.assignedTo ? ticket.assignedTo.name : ""}
                          </span>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6">
                <div className="flex flex-col">
                  <TicketFiles
                    id={id}
                    uploaded={uploaded}
                    setUploaded={setUploaded}
                  />
                </div>
              </div>
              <div className="mt-6">
                <div>
                  <h2 className="text-sm font-medium text-gray-500">
                    Contact Details
                  </h2>
                  <div className="flex flex-col">
                    {ticket.client ? (
                      <>
                        <span>Name - {ticket.name}</span>
                        <span>Email - {ticket.email} </span>
                        <span>
                          Number - {ticket.client ? ticket.client.number : ""}{" "}
                        </span>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
