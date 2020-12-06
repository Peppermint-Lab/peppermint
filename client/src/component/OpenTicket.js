import React, { useState, useEffect } from "react";
import { Table, Button, Icon, Container, Input } from "rsuite";
import Popup from 'reactjs-popup';
// import TicketInfo from "../component/TicketInfo";


import { baseUrl } from "../utils.js";

const OpenTicket = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);

  const open = () => setModalOpen(true);
  const close = () => setModalOpen(false);

  const { Column, HeaderCell, Cell } = Table;

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
              // console.log(row)
              return (
                <div>
                  <Button size="xs" onClick={open}>
                    Show Job Info
                  </Button>
                   <Popup modal open={modalOpen} >
                  <Button
                  style={{ float: "right"}}
                    onClick={() => {
                      console.log('modal closed ');
                      close();
                    }}
                  >
                    <Icon icon="close" />
                  </Button>
                    <Container>
                      <div className="top-left">
                        <h4>Job Issue</h4>
                        <Input componentClass="textarea" rows={10}  placeholder="If you see this there is no issue entered...." defaultValue={row.issue}/>
                      </div>
                    </Container>

                    <Container>
                      <div className="bottom-left">
                        <h4>Customer Infomation</h4>
                        <ul>
                          <li>Company: {row.company}</li>
                          <li>Caller: {row.name}</li>
                          <li>Email: {row.email}</li>
                          <li>Priority: {row.priority}</li>
                        </ul>
                      </div>
                    </Container>

                    <Container>
                      <div className="top-right">
                        <h4>Job Notes</h4>
                        <Input componentClass="textarea" rows={10}  placeholder="Enter Job notes here..." defaultValue={null}/>
                      </div>
                    </Container>

                    <Container>
                      <div className="bottom-right">
                        <h4>Time Allocation</h4>
                        
                      </div>
                    </Container>

                  </Popup>
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
