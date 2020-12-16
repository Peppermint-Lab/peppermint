import React, { useState } from "react";
import { Modal, Input, Button, Row  } from "antd";
import { baseUrl } from "../../utils";

const UpdateClient = (props) => {
  const [visible, setVisible] = useState(false);
  const [clientName, setClientName] = useState(props.client.name);
  const [name, setName] = useState(props.client.ContactName);
  const [email, setEmail] = useState(props.client.email);
  const [number, setNumber] = useState(props.client.number);

  console.log(props.client)

  const postData = async () => {
    await fetch(`${baseUrl}/api/v1/auth/edit`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        id: props.client.id,
        clientName,
        name,
        email,
        number
      }),
    }).then((res) => res.json);
  };

  const onCreate = async (e) => {
    e.stopPropagation();
    setVisible(false);
  };

  const onCancel = (e) => {
    e.stopPropagation();
    setVisible(false);
  };

  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Update
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
            Edit Client Name :{" "}
            <Input
              defaultValue={props.client.name}
              onChange={(e) => setName(e.target.value) }
              style={{ width: 300 }}
            />
          </h5>
        </Row>
        <Row>
          <h5>
            Edit Contact Name :{" "}
            <Input
              defaultValue={props.client.contactName}
              onChange={(e) => setName(e.target.value) }
              style={{ width: 300 }}
            />
          </h5>
        </Row>
        <Row>
          <h5>
            Edit Contact Email :{" "}
            <Input
              defaultValue={props.client.email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: 300 }}
            />
          </h5>
        </Row>
        <Row>
          <h5>
            Edit Contact Number :{" "}
            <Input
              defaultValue={props.client.number}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: 250 }}
            />
          </h5>
        </Row>
        </Modal>
      </Button>
    </div>
  );
};

export default UpdateClient;
