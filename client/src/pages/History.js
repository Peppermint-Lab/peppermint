import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { baseUrl } from "../utils";

const History = () => {

    const [data, setData ] = useState([]);

    const fetchJobs = async () => {
        await fetch(`${baseUrl}/api/v1/tickets/all`, {
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
        fetchJobs();
    }, [])

    console.log(data)

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Client",
      dataIndex: ['client', 'name'],
      key: "client",
      width: "20%",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      width: '15%'
    },
    {
        title: "Issue",
        dataIndex: "issue",
        key: "issue",
        width: "20%",
      },
    {
        title: "status",
        dataIndex: "status",
        key: "status",
    },
    {
        title: "Engineer",
        dataIndex: ["assignedto", 'name'],
        key: "assignedTo",
    },
  ];

  return (
    <div>
      <Table dataSource={data} columns={columns} />
    </div>
  );
};

export default History;
