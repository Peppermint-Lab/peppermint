import React, { useEffect, useState } from "react";
import {
  Table,
  Space,
  Button,
  Popconfirm,
} from "antd";

// import { baseUrl } from "../../utils";
import UpdateClient from "../../component/admin/UpdateClient";

const ClientList = () => {
  const [clientAll, setClientAll] = useState([]);

  console.log(clientAll)

  const fetchClients = () => {
    fetch(`/api/v1/client/allclients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
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

  const deleteClient = async (client) => {
    const id = client._id;
    try {
      await fetch(`/api/v1/client/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }).then((response) => response.json());
    } catch (error) {
      console.log(error);
    }
  };


  const columns = [
    {
      title: "Client Name",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Contact Name",
      dataIndex: "contactName",
      key: "contactName",
      width: 150,
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
          <UpdateClient client={record} />
          <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => deleteClient(record)}
          >
          <Button>Delete</Button>
        </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ marginTop: 5 }}>
      <Table dataSource={clientAll} columns={columns} Pagenation={false} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '20', '30']}} />
    </div>
  );
};

export default ClientList;
