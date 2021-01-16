import React, { useState } from "react";
import { Modal, Input, Space, Radio, Row } from "antd";

/*
Show info of selected user
Edit Button or cancel - If edit is click show Update or cancel 

PostData fetch function which sends all the data. 
*/

const EditInfo = (props) => {
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
        id : users._id,
        name,
        email,
        role
      }),
    }).then((res) => res.json);
  };

  const onCreate = async () => {
    setVisible(false);
    email.toString(email)
    await postData()
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <p
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Edit User info & Role
      </p>
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
            <Input
              defaultValue={users.name}
              onChange={(e) => setName(e.target.value) }
              style={{ width: 300 }}
            />
          </h5>
        </Row>
        <Row>
          <h5>
            Edit Email :{" "}
            <Input
              defaultValue={users.email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: 300, marginLeft: 5 }}
            />
          </h5>
        </Row>
        <Row>
        <h5>Edit Role : </h5>
        <Radio.Group buttonStyle="solid" defaultValue={users.role} onChange={(e) => setRole(e.target.value)} style={ { marginLeft: 20}}>
            <Space>
            <Radio.Button value="user">User</Radio.Button>
            <Radio.Button value="admin">Admin</Radio.Button>
            </Space>
        </Radio.Group>
        </Row>
      </Modal>
    </div>
  );
};

export default EditInfo;
