import React from "react";
import { Space, Table, Button, Popconfirm } from "antd";
import { useQuery } from "react-query";
import { Spin } from "antd";

import server from "../../assets/server_down.svg";

import Edit from "../../components/users/Edit";
import Reset from "../../components/users/Reset";
import Create from "../../components/users/Create";

const fetchUsers = async () => {
  const res = await fetch("/api/v1/auth/getAllUsers");
  return res.json();
};

const Auth = () => {
  const { data, status } = useQuery("fetchAuthUsers", fetchUsers);

  const deleteClient = async (client) => {
    const id = client.id;
    try {
      await fetch(`/api/v1/auth/delete/${id}`, {
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
      title: "Name",
      dataIndex: "firstName",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      key: "action",
      responsive: ["md"],
      render: (text, record) => (
        <Space size="middle">
          <Edit user={record} />
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => deleteClient(record)}
          >
            <Button>Delete</Button>
          </Popconfirm>
          <Reset user={record} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div>
        <main
          className="relative z-0 overflow-y-auto focus:outline-none"
          tabindex="0"
        >
          <div className="py-6">
            <div className="flex flex-row max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl font-semibold text-gray-900">
                Internal Users
              </h1>
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
                      dataSource={data.users}
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
    </div>
  );
};

export default Auth;
