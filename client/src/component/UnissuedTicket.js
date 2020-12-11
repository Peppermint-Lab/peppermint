import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button } from "antd";

import { baseUrl } from "../utils.js";

const UnissuedTicket = () => {
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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
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
      render: () => (
        <Space size="middle">
          <Button size="small">Convert</Button>
          <Button size="small"></Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Unissued Tickets - </h3>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default UnissuedTicket;
