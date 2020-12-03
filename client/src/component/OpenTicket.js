import React, { useState, useEffect } from "react";
import { Table, Modal, Button } from "rsuite";
// import TicketInfo from "../component/TicketInfo";


import { baseUrl } from "../utils.js";

const OpenTicket = () => {
  const [ticketmodalIsOpen, setTicketIsOpen] = useState(false);

  function openTicketModal() {
    setTicketIsOpen(true);
  }

  function closeTicketModal() {
    setTicketIsOpen(false);
  }

  const { Column, HeaderCell, Cell } = Table;

  const [data, setData] = useState([]);

  async function loadContent() {
    await fetch(`${baseUrl}/api/v1/tickets/openedTickets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.tickets);
      });
  }

  useEffect(() => {
    async function resolve() {
      await loadContent();
    }
    resolve();
  }, []);

  console.log(data);

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Open Tickets - {null}</h3>
      <Table height={300} data={data} cellBordered={true}>
        <Column width={100} align="center" fixed>
          <HeaderCell>#</HeaderCell>
          <Cell dataKey="id" />
        </Column>

        <Column width={100} align="center" fixed>
          <HeaderCell>Name</HeaderCell>
          <Cell dataKey="name" />
        </Column>

        <Column width={150} align="center" fixed>
          <HeaderCell>Company</HeaderCell>
          <Cell dataKey="company" />
        </Column>

        <Column width={100} align="center" fixed>
          <HeaderCell>Priority</HeaderCell>
          <Cell dataKey="priority" />
        </Column>

        <Column width={600} align="center" fixed>
          <HeaderCell>Issue</HeaderCell>
          <Cell
            dataKey="issue"
            style={{ textAlign: "left", fontWeight: "bold" }}
          />
        </Column>

        <Column width={150} align="center" fixed>
          <HeaderCell></HeaderCell>
          <Cell>
            {(row) => {
              return (
                <div>
                  <Button size="xs" onClick={openTicketModal}>
                    Show Info
                    <Modal
                      show={ticketmodalIsOpen}
                      onHide={closeTicketModal}
                      keyboard={true}
                    >
                      <Modal.Header><h3>Ticket Info</h3></Modal.Header>
                      <Modal.Body>
                        
                      </Modal.Body>
                    </Modal>
                  </Button>
                </div>
              );
            }}
          </Cell>
        </Column>
      </Table>
    </div>
  );
};

export default OpenTicket;
