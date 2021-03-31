import React, { useState } from "react";
import { Link } from "react-router-dom";
import Open from "../components/ticket/Open";
import Unissued from "../components/ticket/Unissued";

const Tickets = () => {
  const [open, setOpen] = useState(true);
  const [unissued, setUnissued] = useState(false);

  return (
    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-10 -mt-20">
      <div>
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <Link
            onClick={() => {
              setOpen(true);
              setUnissued(false);
            }}
            class="text-white border-transparent hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Open Tickets
          </Link>

          <Link
            onClick={() => {
              setOpen(false);
              setUnissued(true);
            }}
            class="text-white border-transparent hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
          >
            Unissued Tickets
          </Link>
        </nav>
      </div>
      <div className={`${open ? "" : "hidden"}`}>
        <Open />
      </div>
      <div className={`${unissued ? "" : "hidden"}`}>
        <Unissued />
      </div>
    </div>
  );
};

export default Tickets;
