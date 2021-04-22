import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Table = () => {

  const [tickets, setTickets] = useState([]);

  async function getHistory() {
    await fetch(`/api/v1/tickets/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTickets(res.tickets);
      });
  }

  useEffect(() => {
    getHistory();
  }, []);

  const high = "bg-red-100 text-red-800";
  const low = "bg-blue-100 text-blue-800";
  const normal = "bg-green-100 text-green-800";

  console.log(tickets)

  return (
    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-10 -mt-16">
      <div className="flex flex-col">
        <div className=" overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Client
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Priority
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Issue
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Engineer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tickets
                    ? tickets.map((ticket) => {
                        let p = ticket.priority;
                        let badge;

                        if (p === "Low") {
                          badge = low;
                        }
                        if (p === "normal") {
                          badge = normal;
                        }
                        if (p === "High") {
                          badge = high;
                        }

                        return (
                          <tr className="bg-white">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {ticket.name || ""}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {ticket.client.name || ""}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge}`}
                              >
                                {ticket.priority || ""}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {ticket.issue || ""}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {ticket.assignedTo ? ticket.assignedTo.firstName + (' ') + ticket.assignedTo.lastName : 'not assigned'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {ticket.isComplete ? 'Completed' : 'Issued'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                to={{
                                  pathname: `tickets/${ticket._id}`,
                                  state: ticket,
                                }}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                view
                              </Link>
                            </td>
                          </tr>
                        );
                      })
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const Card = () => {
  const [tickets, setTickets] = useState([]);

  async function getHistory() {
    await fetch(`/api/v1/tickets/all`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTickets(res.tickets);
      });
  }

  useEffect(() => {
    getHistory();
  }, []);

  const high = "bg-red-100 text-red-800";
  const low = "bg-blue-100 text-blue-800";
  const normal = "bg-green-100 text-green-800";

  return (
    <div className="overflow-x-auto md:-mx-6 lg:-mx-8 mt-10">
      <div className="py-2 align-middle inline-block min-w-full md:px-6 lg:px-8">
        <div className="overflow-hidden md:rounded-lg">
          {tickets.map((ticket) => {
            let p = ticket.priority;
            let badge;

            if (p === "Low") {
              badge = low;
            }
            if (p === "normal") {
              badge = normal;
            }
            if (p === "High") {
              badge = high;
            }

            return (
              <div className="flex justify-start">
                <div class="w-full mb-2 border">
                  <div class="px-4 py-4">
                    <div>
                      <h1 class="font-semibold leading-tight text-2xl text-gray-800 hover:text-gray-800 ml-1">
                        {ticket.name}
                      </h1>
                      <p className=" px-2">Client: {ticket.client.name}</p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 m-1 rounded-full text-xs font-medium ${badge}`}
                    >
                      {ticket.priority}
                    </span>
                    <p class="text-gray-900 m-2">{ticket.issue}</p>
                    <div class="text-gray-700 text-sm font-bold p-2 m-2">
                      <Link
                        to={{
                          pathname: `tickets/${ticket._id}`,
                          state: ticket,
                        }}
                        class="float-right"
                      >
                        View Full Ticket
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const History = () => {
  return (
    <div className="flex flex-col">
      <div className="hidden sm:block">
        <Table />
      </div>
      <div className="sm:hidden">
        <Card />
      </div>
    </div>
  );
};

export default History;
