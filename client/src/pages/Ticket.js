import React from "react";
//import { Grid, Col, Table, Modal, Button, Nav } from "rsuite";
// import { useHistory } from "react-router-dom";

// import { baseUrl } from "../utils";

import OpenTickets from "../component/OpenTicket";
import UnissuedTickets from "../component/UnissuedTicket";

const Ticket = () => {
  return (
    <div style={{ margin: 25 }}>
      <OpenTickets />
      <UnissuedTickets />
    </div>
  );
};

export default Ticket;
