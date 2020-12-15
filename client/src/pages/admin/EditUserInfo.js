import React, { useState, useEffect } from "react";
import { Space, Table, Button } from "antd";

import { baseUrl } from "../../utils";
import ResetPassword from "../../component/admin/ResetPassword";
import EditInfo from "../../component/admin/EditInfo";

const EditUserInfo = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    await fetch(`${baseUrl}/api/v1/auth/getAllUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setUsers(res.users);
        }
      });
  };

  useEffect(() => {
    fetchUsers();
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button>
              <EditInfo user={record}/>
          </Button>
          <Button>Delete</Button>
          <ResetPassword />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default EditUserInfo;
