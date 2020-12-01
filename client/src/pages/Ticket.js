import React, { useState, useEffect } from "react";
import { Grid, Col, Table, Modal, Button, Nav } from "rsuite";
// import { useHistory } from "react-router-dom";

// import { baseUrl } from "../utils";

const Ticket = () => {
  return (
    <div>
      <Nav>
        <Nav.Item >Opened Tickets</Nav.Item>
        <Nav.Item>Closed Tickets</Nav.Item>
        <Nav.Item>Unissued Tickets</Nav.Item>
      </Nav>
    </div>
  );
};

export default Ticket;
