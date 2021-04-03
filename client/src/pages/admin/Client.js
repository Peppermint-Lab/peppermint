import React, { useEffect, useContext } from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { useHistory } from "react-router-dom";

import { GlobalContext } from "../../Context/GlobalState";

import Update from '../../components/client/Update'

const Client = () => {
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
          if (res.auth === false) {
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
            <Update client={record} />
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
    <div>
      <main
        className="relative z-0 overflow-y-auto focus:outline-none"
        tabindex="0"
      >
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default Client;
