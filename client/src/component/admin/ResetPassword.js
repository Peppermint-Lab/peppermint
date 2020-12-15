import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Space, Button } from "antd";

import { baseUrl } from "../../utils";

const ResetPassword = () => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState('');

  const { Option } = Select;

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

  const postData = async () => {
    await fetch(`${baseUrl}/api/v1/auth/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        user,
        password
      }),
    }).then((res) => res.json);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const onCreate = async () => {
    setVisible(false);
    await postData();
  };

  const onCancel = () => {
    setVisible(false);
  };

  const search = users.map((d) => <Option key={d._id}>{d.name}</Option>);

  return (
    <div>
      <Button
        type="default"
        onClick={() => {
          setVisible(true);
        }}
      >
        Reset password
      </Button>
      <Modal
        visible={visible}
        title="Reset users password"
        okText="Update"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <h3>Select a user below</h3>
        <Space>
        <Select
          showSearch
          style={{ width: 200 }}
          placeholder="Select a client"
          optionFilterProp="children"
          onChange={setUser}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {search}
        </Select>
        <Input onChange={(e) => setPassword(e.target.value)} />
        </Space>
      </Modal>
    </div>
  );
};

export default ResetPassword;
