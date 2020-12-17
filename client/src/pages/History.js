import React, { useState, useEffect } from "react";
import { Table, Input, Button, Space, Row } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { baseUrl } from "../utils";

const History = () => {
  const [data, setData] = useState([]);
  const [filterTable, setFilterTable] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [client, setClient] = useState("");
  const [engineer, setEngineer] = useState("");
  const [status, setStatus] = useState("");

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
  };

  const search = async () => {
    await fetch(`${baseUrl}/api/v1/tickets/filter`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        name,
        email,
        client,
        assignedto : engineer,
        status
      })
    })
      .then((res) => res.json())
      .then((result) => {
        // console.log(result.tickets);
        setFilterTable(result.filter);
      });
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "15%",
    },
    {
      title: "Client",
      dataIndex: ["client", "name"],
      key: "client",
      width: "20%",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      width: "15%",
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
      wdith: "10%",
    },
    {
      title: "Engineer",
      dataIndex: ["assignedto", "name"],
      key: "assignedTo",
    },
  ];

  return (
    <div>
      <Row>
        <h3 className="history-title">Filter through all jobs</h3>
      </Row>
      <div className="history-input">
        <Row>
          <Space>
            <Input
              placeholder="Contact Name"
              style={{ width: 250 }}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              placeholder="Client"
              style={{ width: 250 }}
              onChange={(e) => setClient(e.target.value)}
            />
          </Space>
        </Row>
      </div>
      <div className="history-input" style={{ marginLeft: 52}}>
        <Row>
          <Space>
            <Input
              placeholder="Email"
              style={{ width: 250 }}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Engineer"
              style={{ width: 250 }}
              onChange={(e) => setEngineer(e.target.value)}
            />
            <Input
              placeholder="Status"
              style={{ width: 250 }}
              onChange={(e) => setStatus(e.target.value)}
            />
            <Button >
              <SearchOutlined onClick={() => search()}  />
            </Button>
          </Space>
        </Row>
      </div>

      <div style={{ marginTop: 30 }}>
        <Table
          dataSource={filterTable == null ? data : filterTable}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default History;
