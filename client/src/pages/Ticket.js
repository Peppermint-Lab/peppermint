import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

import OpenTickets from "../component/ticket/OpenTicket";
import UnissuedTickets from "../component/ticket/UnissuedTicket";

const Ticket = () => {
  const history = useHistory()

  useEffect(() => {
    async function auth() {
      await fetch(`/api/v1/auth/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          const res = response;
          if (res.auth === false ) {
            history.push("/login");
          } else {
            return console.log("logged in");
          }
        });
    }
    auth();
    // eslint-disable-next-line
  }, []);

  return (
    <div style={{ margin: 25 }}>
      <OpenTickets />
      <UnissuedTickets />
    </div>
  );
};

export default Ticket;
