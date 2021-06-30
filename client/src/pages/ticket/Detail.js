import React from "react";
import { useQuery } from "react-query";
import { Ellipsis } from "react-awesome-spinners";

import server from '../../assets/server_down.svg'
import TicketDetail from '../../components/ticket/TicketDetail'

const fetchTicketById = async () => {
  const id = window.location.pathname.slice(9)
  const res = await fetch(`/api/v1/tickets/getTicketById/${id}`);
  return res.json();
};

const Detail = () => {
  const { data, status } = useQuery("fetchTickets", fetchTicketById);
  console.log(data)

  return (
    <div>
      {status === "loading" && (
        <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
          <h2> Loading data ... </h2>
          <Ellipsis />
        </div>
      )}

      {status === "error" && (
        <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold"> Error fetching data ... </h2>
          <img src={server} className="h-96 w-96" alt="error" />
        </div>
      )}

      {status === "success" && (
        <div>
            <TicketDetail ticket={data.tickets} />
        </div>
      )}
    </div>
  );
};

export default Detail;
