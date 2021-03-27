import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import { Input } from "antd";

import { GlobalContext } from "../../Context/GlobalState";

// Transfer -> Complete -> Access client notes
// Edit the ticket info
// Add Job notes
// Edit contact details
// Log Time
// File Upload

const Detail = (props) => {
  const { completeTicket } = useContext(GlobalContext);

  const [ticket, setTicket] = useState(props.location.state || null);
  const [edit, setEdit] = useState(false);

  const [note, setNote] = useState(ticket.note);
  const [issue, setIssue] = useState(ticket.issue);
  const [name, setName] = useState(ticket.name);
  const [email, setEmail] = useState(ticket.email);
  const [number, setNumber] = useState(ticket.number);

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

  const { TextArea } = Input;

  const update = async () => {
    await fetch(`/api/v1/tickets/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.ticket._id,
        issue,
        note,
        name,
        email,
        number,
      }),
    }).then((res) => res.json());
  };

  return (
    <div>
      <div class="py-8 xl:py-10">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 xl:max-w-5xl xl:grid xl:grid-cols-3">
          <div class="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
            <div>
              <div>
                <div class="md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                  <div>
                    <h1 class="text-2xl font-bold text-gray-900">
                      Title goes here
                    </h1>
                    <p class="mt-2 text-sm font-bold">
                      opened by {ticket.name} from {ticket.client.name}
                    </p>
                  </div>
                  <div
                    className={edit ? "hidden" : "mt-4 flex space-x-3 md:mt-0"}
                  >
                    <button
                      onClick={() => setEdit(true)}
                      type="button"
                      class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                      <svg
                        class="-ml-1 mr-2 h-5 w-5 text-gray-400"
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
                      class="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                      <svg
                        class="-ml-1 mr-2 h-5 w-5 text-gray-400"
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
                </div>

                <div className="py-3 xl:pt-6 xl:pb-0 ">
                  <h1 className="text-xl">Description</h1>
                  <div className={edit ? "hidden" : "prose max-w-none"}>
                    {ticket.issue}
                  </div>
                  <div className={edit ? "prose max-w-none" : "hidden"}>
                    <TextArea
                      rows={6}
                      defaultValue={ticket.issue}
                      onchange={(e) => setIssue(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <section aria-labelledby="activity-title" class="mt-8 xl:mt-10">
              <div class="pb-4">
                <h2
                  id="activity-title"
                  class="text-lg font-medium text-gray-900"
                >
                  Activity
                </h2>
                <div className="flow-root -mt-4"></div>
              </div>
              <div className={edit ? "hidden" : "mt-3"}>
                {ticket.note ? (
                  ticket.note
                ) : (
                  <p>No work has been entered yet</p>
                )}
              </div>
              <div className={edit ? "mt-3" : "hidden"}>
                <TextArea
                  rows={6}
                  defaultValue={ticket.notes}
                  onchange={(e) => setNote(e.target.value)}
                />
              </div>
            </section>
          </div>

          <aside class="hidden xl:block xl:pl-8">
            <h2 class="sr-only">Details</h2>
            <div class="space-y-5">
              <div class="flex items-center space-x-2">
                <svg
                  class="h-5 w-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                </svg>
                <span class="text-green-700 text-sm font-medium">
                  {ticket.status}
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <svg
                  class="h-5 w-5 text-gray-400"
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
                <span class="text-gray-900 text-sm font-medium">
                  Created on{" "}
                  <time datetime="2020-12-02">{ticket.createdAt}</time>
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <svg
                  class="h-5 w-5 text-gray-400"
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
                <span class="text-gray-900 text-sm font-medium">
                  Last updated{" "}
                  <time datetime="2020-12-02">{ticket.updatedAt}</time>
                </span>
              </div>
            </div>
            <div class="mt-6 border-t border-gray-200 py-6 space-y-8">
              <div>
                <h2 class="text-sm font-medium text-gray-500">Assignees</h2>
                <ul class="mt-3 space-y-3">
                  <li class="flex justify-start">
                    <p href="#" class="flex items-center space-x-3">
                      <div class="text-sm font-medium text-gray-900">
                        {ticket.assignedto.name}
                      </div>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          <aside class="mt-8 xl:hidden">
            <h2 class="sr-only">Details</h2>
            <div class="space-y-5">
              <div class="flex items-center space-x-2">
                <svg
                  class="h-5 w-5 text-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z" />
                </svg>
                <span class="text-green-700 text-sm font-medium">
                  {ticket.status}
                </span>
              </div>
              <div class="flex items-center space-x-2">
                <svg
                  class="h-5 w-5 text-gray-400"
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
              <div class="flex items-center space-x-2">
                <svg
                  class="h-5 w-5 text-gray-400"
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
                <span class="text-gray-900 text-sm font-medium">
                  Created on <time datetime="2020-12-02">Dec 2, 2020</time>
                </span>
              </div>
            </div>
            <div class="mt-6 border-t border-b border-gray-200 py-6 space-y-8">
              <div>
                <h2 class="text-sm font-medium text-gray-500">Assignees</h2>
                <ul class="mt-3 space-y-3">
                  <li class="flex justify-start">
                    <a href="#" class="flex items-center space-x-3">
                      <div class="flex-shrink-0">
                        <img
                          class="h-5 w-5 rounded-full"
                          src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                          alt=""
                        />
                      </div>
                      <div class="text-sm font-medium text-gray-900">
                        Eduardo Benz
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Detail);
