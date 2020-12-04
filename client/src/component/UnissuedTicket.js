import React, { useState, useEffect } from "react";
import { Table, Button } from "rsuite";

import { baseUrl } from "../utils.js";

const UnissuedTicket = () => {
  // const history = useHistory();

  const { Column, HeaderCell, Cell, } = Table;

  const [data, setData] = useState([]);

  async function loadContent() {
    await fetch(`${baseUrl}/api/v1/tickets/unissuedTickets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
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

  const convert = () => {
    fetch(`${baseUrl}/api/v1/tickets/convertTicket`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        data,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          window.location.reload();
          console.log("Congrats it worked");
        }
      });
  };

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Unissued Tickets - </h3>
      <Table height={400} data={data} cellBordered={true}>
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

        <Column width={75} align="center" fixed>
          <HeaderCell></HeaderCell>
          <Cell>
            {(row) => {
              // console.log(row)
              return (
                <div>
                  <Button size="xs" onClick={convert}>
                    Convert
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

export default UnissuedTicket;
