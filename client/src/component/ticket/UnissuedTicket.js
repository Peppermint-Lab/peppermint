import React, { useState, useEffect } from "react";
import { Table, Space, Button } from "antd";

import ViewTicket from "./ViewTicket.js";

const UnissuedTicket = () => {
  const [data, setData] = useState([]);

  async function loadContent() {
    await fetch(`/api/v1/tickets/unissuedTickets`, {
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

  const convert = () => {
    fetch(`/api/v1/tickets/convertTicket`, {
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      responsive: ["md"],
    },
    {
      title: "Client",
      dataIndex: ["client", "name"],
      key: "client",
      width: 75,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: 30,
      responsive: ["md"],
    },
    {
      title: "Issue",
      dataIndex: "issue",
      key: "issue",
    },
    {
      key: "action",
      width: 100,
      render: (record) => (
        <Space size="middle">
          <Button size="small" onClick={convert}>
            Convert
          </Button>
          <Button size="small">
            <ViewTicket ticket={record} />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Unissued Tickets - </h3>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />
    </div>
  );
};

export default UnissuedTicket;
