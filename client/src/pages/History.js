import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

const Table = (props) => {
  const high = "bg-red-100 text-red-800";
  const low = "bg-blue-100 text-blue-800";
  const normal = "bg-green-100 text-green-800";

  return (
    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-10">
      {/* <div className="flex flex-row">
        <div className="w-44 mr-4">
          <input
            onChange={(e) => props.setId(e.target.value)}
            type="number"
            name="ticketid"
            id="ticketid"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Search by Ticket ID"
          />
        </div>
        <button
          type="button"
          onClick={() => {
            props.filterTickets();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button
          type="button"
          className="ml-3"
          onClick={() => props.fetchAllTickets()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
      </div> */}
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
                      Id
                    </th>
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
                  {props.tickets.map((ticket) => {
                    let p = ticket.priority;
                    let badge;

                    if (p === "Low") {
                      badge = low;
                    }
                    if (p === "Normal") {
                      badge = normal;
                    }
                    if (p === "High") {
                      badge = high;
                    }

                    return (
                      <tr className="bg-white" key={ticket.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {ticket.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {ticket.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ticket.client.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge}`}
                          >
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ticket.issue}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ticket.assignedTo
                            ? ticket.assignedTo.firstName +
                              " " +
                              ticket.assignedTo.lastName
                            : "not assigned"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ticket.isComplete ? "Completed" : "Issued"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            to={{
                              pathname: `tickets/${ticket.id}`,
                              state: ticket,
                            }}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            view
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
              <div className="flex justify-start" key={ticket.id}>
                <div className="w-full mb-2 border">
                  <div className="px-4 py-4">
                    <div>
                      <h1 className="font-semibold leading-tight text-2xl text-gray-800 hover:text-gray-800 ml-1">
                        {ticket.name}
                      </h1>
                      <p className=" px-2">Client: {ticket.client.name}</p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 m-1 rounded-full text-xs font-medium ${badge}`}
                    >
                      {ticket.priority}
                    </span>
                    <p className="text-gray-900 m-2">{ticket.issue}</p>
                    <div className="text-gray-700 text-sm font-bold p-2 m-2">
                      <Link
                        to={{
                          pathname: `tickets/${ticket._id}`,
                          state: ticket,
                        }}
                        className="float-right"
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

const fetchAllTickets = async () => {
  const res = await fetch("/api/v1/tickets/all");
  return res.json();
};

const History = () => {

  const { data, status } = useQuery("fetchAllTickets", fetchAllTickets);


  return (
    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-10 flex flex-col">
      <div className="sm:px-6 md:px-8 ml-2">
        <div className="flex flex-row">
          <h1 className="text-2xl font-semibold text-gray-900">History</h1>
        </div>
      </div>
      <div className="flex flex-col">
        {status === "loading" && <div>Loading data ... </div>}

        {status === "error" && <div>Error fetching data</div>}

        {status === "success" && (
          <div>
            <div key={data.tickets.id}>
              <div className="hidden sm:block">
                <Table
                  tickets={data.tickets}
                  fetchAllTickets={fetchAllTickets}
                  // setId={setId}
                  // filterTickets={filterTickets}
                />
              </div>
              <div className="sm:hidden">
                <Card tickets={data.tickets} />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
