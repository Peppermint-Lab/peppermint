import React, { useEffect, useState } from "react";
import { Table, Space, Button, Modal, Popconfirm } from "antd";

import { baseUrl } from "../../utils";

const ClientList = () => {
  const [clientAll, setClientAll] = useState([]);

  const fetchClients = () => {
    fetch(`${baseUrl}/api/v1/client/allclients`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setClientAll(res.client);
        }
      });
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const UpdateClient = () => {

  }

  const deleteClient = async (client) => {
    const id = client._id
    try {
      await fetch(`${baseUrl}/api/v1/client/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((response) => response.json());
    } catch (error) {
      console.log(error)
    }
  }

  const columns = [
    {
      title: "Client Name",
      dataIndex: "name",
      key: "name",
      width: 200,
    },
    {
      title: "Contact Name",
      dataIndex: "contactName",
      key: "contactName",
      width: 100,
    },
    {
      title: "Contact Email",
      dataIndex: "email",
      key: "email",
      width: 50,
    },
    {
      title: "Contact Number",
      dataIndex: "number",
      key: "number",
      width: 75,
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (record) => (
        <Space size="middle">
          <Button size="small">Job History</Button>
          <Button size="small">Update Info</Button>
          <Popconfirm title='Are you sure you want to delete?' onConfirm={() => deleteClient(record)}>
            <Button size="small">Delete</Button>
            </Popconfirm>
        </Space>
      ),
    },
  ];

  console.log(clientAll);

  return (
    <div style={{ marginLeft: -30, marginTop: 5 }}>
      <Table dataSource={clientAll} columns={columns} Pagenation={false} />
    </div>
  );
};

export default ClientList;
