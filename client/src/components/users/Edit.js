import React, { useState } from "react";
import { Modal, Space, Radio, Row, Button } from "antd";

const Edit = (props) => {
  // eslint-disable-next-line
  const [users, setUsers] = useState(props.user);
  const [name, setName] = useState(props.user.name);
  const [email, setEmail] = useState(props.user.email);
  const [role, setRole] = useState(props.user.role);
  const [visible, setVisible] = useState(false);

  const postData = async () => {
    await fetch(`/api/v1/auth/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        id: users._id,
        name,
        email,
        role,
      }),
    }).then((res) => res.json);
  };

  const onCreate = async () => {
    setVisible(false);
    email.toString(email);
    email.toLowerCase();
    await postData();
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Edit User info & Role
      </Button>
      <Modal
        visible={visible}
        title="Edit a users info"
        okText="Update"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Row>
          <h5>
            Edit Name :{" "}
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              defaultValue={users.name}
              onChange={(e) => setName(e.target.value)}
            />
          </h5>
        </Row>
        <Row>
          <h5>
            Edit Email :{" "}
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              defaultValue={users.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </h5>
        </Row>
          <h5>Edit Role : </h5>
          <Radio.Group
            buttonStyle="solid"
            defaultValue={users.role}
            onChange={(e) => setRole(e.target.value)}
          >
            <Space>
              <Radio.Button value="user">User</Radio.Button>
              <Radio.Button value="admin">Admin</Radio.Button>
            </Space>
          </Radio.Group>
      </Modal>
    </div>
  );
};

export default Edit;
