import React from "react";
import Open from "../../components/ticket/Open";

const Tickets = () => {
  return (
    <div className="max-w-screen-xl mx-auto pb-6 px-4 sm:px-6 lg:pb-16 lg:px-10 flex flex-col">
      <div className="sm:px-6 md:px-8 ml-2">
        <div className="flex flex-row">
          <h1 className="text-2xl font-semibold text-gray-900">Open Ticket</h1>
        </div>
      </div>
     <div>
       <Open />
     </div>
    </div>
  );
};

export default Tickets;
