import React, { useState } from "react";
import { useRouter } from "next/router";

import TipTapEditor from "../../../../components/TipTapEditor";

export default function ClientTicket() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState();
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Normal");

  async function post() {
    await fetch("/api/v1/ticket/client-created", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        detail: issue,
        title,
        priority,
        client: router.query.id,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        router.push(`/tickets/new/${router.query.id}/submitted`);
      });
  }

  return (
    <div className="bg-[#111827] h-screen flex items-center justify-center">
      <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full sm:p-6">
        <div className="flex flex-row w-full">
          <span className="text-md pb-2 font-bold text-xl">
            Create a new ticket
          </span>
        </div>

        <input
          type="text"
          name="title"
          placeholder="Title"
          maxLength={64}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full pl-0 pr-0 sm:text-xl border-none focus:outline-none focus:shadow-none focus:ring-0 focus:border-none"
        />

        <div className="">
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            className=" w-full pl-0 pr-0 sm:text-sm border-none focus:outline-none focus:shadow-none focus:ring-0 focus:border-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            className=" w-full pl-0 pr-0 sm:text-sm border-none focus:outline-none focus:shadow-none focus:ring-0 focus:border-none"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TipTapEditor value={issue} setContent={setIssue} />

          <div className="border-t border-gray-300 ">
            <div className="mt-2 float-right">
              <button
                onClick={() => post()}
                type="button"
                className="inline-flex justify-center rounded-md shadow-sm px-2.5 py-1.5 border border-transparent text-xs bg-green-600 font-medium text-white hover:bg-green-700 focus:outline-none "
              >
                Create Ticket
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
