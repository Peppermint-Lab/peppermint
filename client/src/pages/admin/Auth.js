import React, { useEffect, useContext } from "react";
import { Space, Table, Button, Popconfirm } from "antd";
import { useHistory } from "react-router-dom";

import { GlobalContext } from "../../Context/GlobalState";

import Edit from "../../components/users/Edit";
import Reset from "../../components/users/Reset";
import Create from "../../components/users/Create";

const Auth = () => {
  const history = useHistory();
  const { users, getUsers } = useContext(GlobalContext);

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
          console.log(response);
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

  const deleteClient = async (client) => {
    const id = client.id;
    try {
      await fetch(`/api/v1/auth/delete/${id}`, {
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

  useEffect(() => {
    getUsers();
  }, []);

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
                <Table
                  dataSource={users}
                  columns={columns}
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
    </div>
  );
};

export default Auth;
