import React, { useState } from "react";
import Link from "next/link";

export default function TicketsMobileList({ tickets }) {
  const high = "bg-red-100 text-red-800";
  const low = "bg-blue-100 text-blue-800";
  const normal = "bg-green-100 text-green-800";

  const [data, setData] = React.useState(tickets);
  const [searchParam] = useState(["title", "name", "priority"]);
  const [f, setF] = useState("");

  async function filter(e) {
    setF(e.target.value);
    const filter = tickets.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem].toString().toLowerCase().indexOf(f.toLowerCase()) > -1
        );
      });
    });

    setData(filter);
  }

  return (
    <div className="overflow-x-auto md:-mx-6 lg:-mx-8 mt-10">
      <div>
        <input
          type="text"
          name="text"
          id="text"
          className="shadow-sm focus:border-gray-300 focus:ring-gray-300 appearance-none block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Search ...."
          value={f}
          onChange={(e) => filter(e)}
        />
      </div>

      <div className="py-2 align-middle inline-block min-w-full md:px-6 lg:px-8">
        <div className="overflow-hidden md:rounded-lg">
          {data.map((ticket) => {
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
              <div className="flex justify-start" key={ticket.id}>
                <div className="w-full mb-2 border">
                  <div className="px-4 py-4">
                    <div>
                      <h1 className="font-semibold leading-tight text-2xl text-gray-800 hover:text-gray-800 ml-1">
                        {ticket.title}
                      </h1>
                      <p className="px-2">Client: {ticket.client.name}</p>
                      <p className="px-2">Name of caller: {ticket.name}</p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge}`}
                    >
                      {ticket.priority}
                    </span>
                    <p className="text-gray-900 m-2">{ticket.issue}</p>
                    <div className="text-gray-700 text-sm font-bold mt-2">
                      <Link href={`ticket/${ticket.id}`} className="">
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
}
