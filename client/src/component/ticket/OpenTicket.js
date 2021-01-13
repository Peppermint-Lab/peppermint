import React, { useState, useEffect } from "react";
import { Table, Space, Button } from "antd";

// import { baseUrl } from "../../utils.js";
import ViewTicket from "./ViewTicket.js";

const OpenTicket = () => {
  const [data, setData] = useState([]);

  async function loadContent() {
    await fetch(`/api/v1/tickets/openedTickets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.tickets);
        setData(result.tickets);
      });
  }

  useEffect(() => {
    async function resolve() {
      await loadContent();
    }
    resolve();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Client",
      dataIndex: ['client', 'name'],
      key: "client",
      width: 150,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: 50,
    },
    {
      title: "Issue",
      dataIndex: "issue",
      key: "issue",
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (record) => (
        <Space size="middle">
            <Button size="small">
              <ViewTicket ticket={record} />
            </Button>
          <Button size="small">Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Open Tickets - {null}</h3>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default OpenTicket;
