import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button } from 'antd';
import Popup from "reactjs-popup";

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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: 150
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      width: 150
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      width: 50,
    },
    {
      title: 'Issue',
      dataIndex: 'issue',
      key: 'issue',
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      render: () => (
        <Space size="middle">
          <Button size="small">Show</Button>
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
