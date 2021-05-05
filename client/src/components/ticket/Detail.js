import React, { useState, useEffect, useContext } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { Input, message, Upload, Divider } from "antd";
import moment from "moment";

import { GlobalContext } from "../../Context/GlobalState";
import File from "./File";
import Transfer from "./Transfer";

const Detail = (props) => {
  const { completeTicket, unCompleteTicket } = useContext(GlobalContext);

  const [ticket, setTicket] = useState(props.location.state || null);
  const [edit, setEdit] = useState(false);

  const [note, setNote] = useState(ticket.note);
  const [issue, setIssue] = useState(ticket.issue);
  const [name, setName] = useState(ticket.name);
  const [email, setEmail] = useState(ticket.email);
  const [number, setNumber] = useState(ticket.number);
  const [file, setFile] = useState([]);
  const [badge, setBadge] = useState("");

  const history = useHistory()

  const id = props.match.params.id;

  useEffect(() => {
    async function getTicket() {
      try {
        await fetch(`/api/v1/tickets/getTicketById/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        })
          .then((res) => res.json())
          .then(async (res) => {
            console.log(res.ticket);
            await setTicket(res.ticket);
          });
      } catch (error) {
        console.log(error);
      }
    }
    getTicket();
  }, []);

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

  const { TextArea } = Input;

  const update = async () => {
    await fetch(`/api/v1/tickets/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: ticket.id,
        issue,
        note,
        name,
        email,
        number,
      }),
    }).then((res) => res.json());
  };

  const propsUpload = {
    name: "file",
    action: `/api/v1/tickets/uploadFile/${id}`,
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
    <div className="relative">
      <div className="py-8 xl:py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-5xl xl:grid xl:grid-cols-3 " >
          <div className="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
            <div>
              <div>
                <div className="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Title goes here
                    </h1>
                    <p className="mt-2 text-sm font-bold">
                      opened by {ticket.name} from {ticket.client.name}
                    </p>
                  </div>
                </div>

                <div className="flex flex-row p-1 m-1 space-x-4">
                  <div className="mt-4 flex space-x-3 md:mt-0">
                    <Upload {...propsUpload}>
                      <button
                        type="button"
                        className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      >
                        <svg
                          className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                          />
                        </svg>
                        <span>Upload</span>
                      </button>
                    </Upload>
                  </div>
                  <div
                    className={edit ? "hidden" : "mt-4 flex space-x-3 md:mt-0"}
                  >
                    <button
                      onClick={() => setEdit(true)}
                      type="button"
                      className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                      <svg
                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      <span>Edit</span>
                    </button>
                  </div>
                  <div
                    className={edit ? "mt-4 flex space-x-3 md:mt-0" : "hidden"}
                  >
                    <button
                      onClick={async () => {
                        setEdit(false);
                        await update();
                      }}
                      type="button"
                      className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                      <svg
                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                      <span>Save</span>
                    </button>
                  </div>
                  <div className="mt-4 flex space-x-3 md:mt-0">
                    {ticket.isComplete === false ? (
                      <button
                      onClick={async () => {
                        await completeTicket(ticket.id)
                        history.push('/tickets')
                      }}
                      type="button"
                      className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span>Complete</span>
                    </button>
                    ) : (
                      <button
                      onClick={async () => {
                        await unCompleteTicket(ticket.id)
                        history.push('/tickets')
                      }}
                      type="button"
                      className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        />
                      </svg>
                      <span>Un-complete</span>
                    </button>
                    )}
                  </div>
                  <div className="mt-4 flex space-x-3 md:mt-0">
                    <Transfer ticket={ticket} />
                  </div>
                </div>

                <div className="py-3 xl:pt-6 xl:pb-0 ">
                  <h1 className="text-xl">Description</h1>
                  <div className={edit ? "hidden" : "prose max-w-none"}>
                    {issue}
                  </div>
                  <div className={edit ? "prose max-w-none" : "hidden"}>
                    <TextArea
                      rows={6}
                      defaultValue={issue}
                      onChange={(e) => setIssue(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <section aria-labelledby="activity-title" className="mt-8 xl:mt-10">
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
                  note
                ) : (
                  <p>No work has been entered yet</p>
                )}
              </div>
              <div className={edit ? "mt-3" : "hidden"}>
                <TextArea
                  rows={6}
                  defaultValue={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </section>
          </div>

          <aside className="hidden xl:block xl:pl-8">
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
                  {ticket.isComplete ? 'Completed' : 'Issued'}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  class={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge}`}
                >
                  {ticket.priority}
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
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
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
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="text-gray-900 text-sm font-medium">
                  Last updated{" "}
                  <spa>{moment(ticket.updatedAt).format("DD/MM/YYYY")}</spa>
                </span>
              </div>
            </div>
            <div className="mt-6 border-t border-gray-200 py-6 space-y-8">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Assignees</h2>
                <ul className="mt-3 space-y-3">
                  <li className="flex justify-start">
                    <p href="#" className="flex items-center space-x-3">
                      <div className="text-sm font-medium text-gray-900">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500">
                          <span className="font-medium leading-none text-white">
                            {ticket.assignedTo.firstName[0]}
                          </span>
                        </span>
                      </div>
                      <span>{ticket.assignedTo.firstName} {ticket.assignedTo.lastName}</span>
                    </p>
                  </li>
                </ul>
                <Divider className="bg-gray-200" />
              </div>
            </div>
            <div className="-mt-10">
              <div className="flex flex-col">
                <h1>Files attached to job</h1>
                <File ticket={ticket} />
              </div>
            </div>
            <div className="mt-10">
              <div>
                <Divider className="bg-gray-200" />
                <h2 className="text-sm font-medium text-gray-500">
                  Contact Details
                </h2>
                <div className="flex flex-col">
                  <span>Name - {ticket.name}</span>
                  <span>Email - {ticket.email} </span>
                  <span>Number - {ticket.client.number} </span>
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
                {ticket.isComplete ? 'Completed' : 'Issued'}
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
                    fill-rule="evenodd"
                    d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                    clip-rule="evenodd"
                  />
                </svg>
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
                    fill-rule="evenodd"
                    d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                    clip-rule="evenodd"
                  />
                </svg>
                <span className="text-gray-900 text-sm font-medium">
                  Created on <time datetime="2020-12-02">Dec 2, 2020</time>
                </span>
              </div>
            </div>
            <div className="mt-6 border-t border-b border-gray-200 py-6 space-y-8">
              <div>
                <h2 className="text-sm font-medium text-gray-500">Assignees</h2>
                <ul className="mt-3 space-y-3">
                  <li className="flex justify-start">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gray-500">
                          <span className="font-medium leading-none text-white">
                          {ticket.assignedTo ? ticket.assignedTo.firstName[0] : ''}
                          </span>
                        </span>
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        <span> {ticket.assignedTo.firstName}</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <div className="flex flex-col">
                <h1>Files attached to job</h1>
                <File ticket={ticket} />
              </div>
            </div>
            <div className="mt-6">
              <div>
                <h2 className="text-sm font-medium text-gray-500">
                  Contact Details
                </h2>
                <div className="flex flex-col">
                  <span>Name - {ticket.name}</span>
                  <span>Email - {ticket.email} </span>
                  <span>Number - {ticket.client.number} </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Detail;