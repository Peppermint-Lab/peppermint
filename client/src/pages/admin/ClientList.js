import React, { useEffect, useContext } from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { useHistory } from "react-router-dom";

import UpdateClient from "../../component/admin/UpdateClient";
import { GlobalContext } from "../../Context/GlobalState";

const ClientList = () => {

  const history = useHistory();
  const { clients, getClients } = useContext(GlobalContext);

  useEffect(() => {
    async function auth() {
      await fetch(`/api/v1/auth/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          const res = response;
          if (res.auth === false ) {
            history.push("/login");
          } else {
            return console.log("logged in");
          }
        });
    }
    auth();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getClients();
    // eslint-disable-next-line
  }, []);

  const deleteClient = async (client) => {
    const id = client._id;
    try {
      await fetch(`/api/v1/client/delete/${id}`, {
        method: "DELETE",
        headers: {
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
      responsive: ["md"],
    },
    {
      title: "Contact Email",
      dataIndex: "email",
      key: "email",
      width: 50,
      responsive: ["md"],
    },
    {
      title: "Contact Number",
      dataIndex: "number",
      key: "number",
      width: 75,
    },
    {
      key: "action",
      responsive: ["md"],
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
      <Table
        dataSource={clients}
        columns={columns}
        Pagenation={false}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />
    </div>
  );
};

export default ClientList;
