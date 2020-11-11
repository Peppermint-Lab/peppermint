import React, { useState, useEffect } from "react";
import { Grid, Col, Table } from "rsuite";

import { baseUrl } from "../utils";

const OpenTicket = () => {

    const { Column, HeaderCell, Cell, Pagination } = Table;

    return (
        <div>
            <h3 style={{ textAlign:"center"}}>Open Tickets - (4)</h3>
            <Table height={400}>
                <Column width={70} align="center" fixed>
                    <HeaderCell>Id</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column width={70} align="center" fixed>
                    <HeaderCell>Date</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column width={70} align="center" fixed>
                    <HeaderCell>Time</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column width={70} align="center" fixed>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column width={100} align="center" fixed>
                    <HeaderCell>Company</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column width={100} align="center" fixed>
                    <HeaderCell>Priority</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column width={100} align="center" fixed>
                    <HeaderCell>Issue</HeaderCell>
                    <Cell dataKey="id" />
                </Column>
            </Table>
        </div>
  
  );
};

const UnissuedTicket = () => {

    const { Column, HeaderCell, Cell, Pagination } = Table;

    const [data, setData] = useState([])

    async function loadContent() {
        await fetch(`${baseUrl}/api/v1/tickets/unissuedTickets`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization":"Bearer " + localStorage.getItem("jwt"),
            }
        })
        .then(res => res.json())
        .then(result=>{
            setData(result.tickets)
        })
      }
  
      useEffect(()=>{
          async function resolve() {
              await loadContent();
                }
            resolve();
         }, []);

         console.log(data)

    return (
        <div>
            <h3 style={{ textAlign:"center"}}>Unissued Tickets - (3)</h3>
            <Table height={400} data={data}>
                <Column width={70} align="center" resizable>
                    <HeaderCell>#</HeaderCell>
                    <Cell dataKey="id" />
                </Column>

                <Column width={100} align="center" resizable>
                    <HeaderCell>Date</HeaderCell>
                    <Cell dataKey="date" />
                </Column>

                <Column width={100} align="center" resizable>
                    <HeaderCell>Time</HeaderCell>
                    <Cell dataKey="time" />
                </Column>

                <Column width={150} align="center" resizable>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="name" />
                </Column>

                <Column width={100} align="center" resizable>
                    <HeaderCell>Company</HeaderCell>
                    <Cell dataKey="company" />
                </Column>

                <Column width={100} align="center" resizable>
                    <HeaderCell>Priority</HeaderCell>
                    <Cell dataKey="priority" />
                </Column>

                <Column width={200} align="center" resizable>
                    <HeaderCell>Issue</HeaderCell>
                    <Cell dataKey="issue" />
                </Column>
            </Table>
        </div>
    );
  };

const Ticket = () => {
  return (
    <div>
      <Grid fluid>
        <Col xs={12}>
            <OpenTicket />
        </Col>
        <Col xs={12}>
            <UnissuedTicket />
        </Col>
      </Grid>
    </div>
  );
};

export default Ticket;
