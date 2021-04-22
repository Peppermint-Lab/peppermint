import React, { useState } from "react";
import { Modal, Space, Radio, Row, Button } from "antd";

const Edit = (props) => {
  // eslint-disable-next-line
  const [user, setUsers] = useState(props.user);
  const [firstName, setFirstName] = useState(props.user.firstName);
  const [lastName, setLastName] = useState(props.user.lastName);
  const [email, setEmail] = useState(props.user.email);
  const [role, setRole] = useState(props.user.isAdmin);
  const [visible, setVisible] = useState(false);

  const postData = async () => {
    await fetch(`/api/v1/auth/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        id: user.id,
        firstName,
        lastName,
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
            <div className="flex flex-row">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              defaultValue={user.firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              defaultValue={user.lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            </div>
          </h5>
        </Row>
        <Row>
          <h5>
            Edit Email :{" "}
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </h5>
        </Row>
          <h5>Edit Role : </h5>
          <Radio.Group
            buttonStyle="solid"
            defaultValue={user.isAdmin}
            onChange={(e) => setRole(e.target.value)}
          >
            <Space>
              <Radio.Button value={false}>User</Radio.Button>
              <Radio.Button value={true}>Admin</Radio.Button>
            </Space>
          </Radio.Group>
      </Modal>
    </div>
  );
};

export default Edit;
