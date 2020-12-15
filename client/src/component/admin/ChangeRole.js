import React, { useEffect, useState } from "react";
import { Modal, Input, Select, Space, Radio } from "antd";

import { baseUrl } from "../../utils";

const ChangeRole = () => {
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState("");
  const [role, setRole] = useState("");

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
    await fetch(`${baseUrl}/api/v1/auth/changeRole`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        role,
        user
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
      <p
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Change users role
      </p>
      <Modal
        visible={visible}
        title="Change a users role"
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
        <Radio.Group buttonStyle="solid" onChange={(e) => setRole(e.target.value)}>
            <Space>
            <Radio.Button value="user">User</Radio.Button>
            <Radio.Button value="admin">Admin</Radio.Button>
            </Space>
        </Radio.Group>
        </Space>
      </Modal>
    </div>
  );
};

export default ChangeRole;
