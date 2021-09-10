import React from "react";
import { Table, Space, Button, Popconfirm } from "antd";
import { useQuery } from "react-query";
import { Spin } from "antd";

import server from "../../assets/server_down.svg";

import Update from "../../components/client/Update";
import Create from "../../components/client/Create";

const fetchClients = async () => {
  const res = await fetch("/api/v1/client/allclients");
  return res.json();
};

const Client = () => {
  const { data, status } = useQuery("fetchClients", fetchClients);

  const deleteClient = async (client) => {
    const id = client.id;
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
          <div className="flex flex-row max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
            <div className="ml-3">
              <Create />
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
              {status === "loading" && (
                <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
                  <h2> Loading data ... </h2>
                  <Spin />
                </div>
              )}

              {status === "error" && (
                <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
                  <h2 className="text-2xl font-bold">
                    {" "}
                    Error fetching data ...{" "}
                  </h2>
                  <img src={server} className="h-96 w-96" alt="error" />
                </div>
              )}

              {status === "success" && (
                <div>
                  <Table
                    dataSource={data.clients}
                    columns={columns}
                    pagination={{
                      defaultPageSize: 10,
                      showSizeChanger: true,
                      pageSizeOptions: ["10", "20", "30"],
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Client;
