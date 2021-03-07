import React, { useEffect, useContext } from "react";
import { Space, Table, Button, Popconfirm } from "antd";
import { useHistory } from "react-router-dom";

import ResetPassword from "../../component/admin/ResetPassword";
import EditInfo from "../../component/admin/EditInfo";
import { GlobalContext } from "../../Context/GlobalState";


const EditUserInfo = () => {

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
          console.log(response)
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

  const deleteClient = async (client) => {
    const id = client._id;
    console.log(id);
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
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      key: "action",
      responsive: ["md"],
      render: (text, record) => (
        <Space size="middle">
          <Button>
            <EditInfo user={record} />
          </Button>
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => deleteClient(record)}
          >
            <Button>Delete</Button>
          </Popconfirm>
          <ResetPassword user={record} />
        </Space>
      ),
    },
  ];

  return (
    <div>
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
  );
};

export default EditUserInfo;
