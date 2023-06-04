import React from "react";
import { useQuery } from "react-query";
import Link from "next/link";
import Loader from "react-spinners/ClipLoader";
import { useRouter } from "next/router";

import MarkdownPreview from "../MarkdownPreview";
import TicketsMobileList from "../../components/TicketsMobileList";

async function getUserTickets() {
  const res = await fetch("/api/v1/ticket/open");
  return res.json();
}

export default function OpenTickets() {
  const { data, status, error } = useQuery("userTickets", getUserTickets);

  const high = "bg-red-100 text-red-800";
  const low = "bg-blue-100 text-blue-800";
  const normal = "bg-green-100 text-green-800";

  const columns = React.useMemo(() => [
    {
      Header: "No.",
      accessor: "id",
      width: 10,
      id: "id",
    },
    {
      Header: "Name",
      accessor: "name",
      id: "name",
    },
    {
      Header: "Client",
      accessor: "client.name",
      id: "client_name",
    },
    {
      Header: "Priority",
      accessor: "priority",
      id: "priority",
      Cell: ({ row, value }) => {
        let p = value;
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
          <>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge}`}
            >
              {value}
            </span>
          </>
        );
      },
    },
    {
      Header: "Team",
      accessor: "team.name",
      id: "team_name",
    },
    {
      Header: "Title",
      accessor: "title",
      id: "Title",
      Cell: ({ value }) => {
        return (
          <div className="truncate">
            <MarkdownPreview data={value} />
          </div>
        );
      },
    },
    {
      Header: "",
      id: "actions",
      Cell: ({ row, value }) => {
        return (
          <>
            <Link href={`/tickets/${row.cells[0].value}`}>View</Link>
          </>
        );
      },
    },
  ]);

  return (
    <>
      {status === "success" && (
        <>
          {data.tickets && data.tickets.length > 0 && (
            <>
              <div className="hidden sm:block">
                {data.tickets.map((item) => (
                  <div className="bg-white shadow-md rounded-lg mt-4">
                    <div className="p-4 flex flex-col">
                      <div className="flex flex-row justify-between items-center">
                        <span className="text-lg font-bold">{item.title}</span>
                        <span className="text-xs font-bold">3h ago</span>
                      </div>
                      <div className="">
                        <span className="text-xs">{item.id}</span>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm">{item.detail}</span>
                      </div>
                      <div className="mt-2">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Low
                        </span>
                        <span className="ml-2">{item.client.name}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sm:hidden">
                <TicketsMobileList tickets={data.tickets} />
              </div>
            </>
          )}

          {data.tickets.length === 0 && (
            <>
              <div className="text-center mt-72">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  You currently don't have any assigned tickets. :)
                </h3>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
