import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import OpenTickets from "../component/ticket/OpenTicket";
import UnissuedTickets from "../component/ticket/UnissuedTicket";

const Ticket = () => {
  const history = useHistory();

  useEffect(() => {
    const call = async () => {
      const res = localStorage.getItem("jwt");
      console.log(res);
      if (!res) {
        history.push("/login");
      } else {
        return console.log("logged in");
      }
    };
    call();
  }, []);

  return (
    <div style={{ margin: 25 }}>
      <OpenTickets />
      <UnissuedTickets />
    </div>
  );
};

export default Ticket;
