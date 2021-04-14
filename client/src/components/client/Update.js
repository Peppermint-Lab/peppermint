import React, { useState } from "react";
import { Modal, Button, Row } from "antd";

const Update = (props) => {
  const [visible, setVisible] = useState(false);
  const [clientName, setClientName] = useState(props.client.name);
  const [name, setName] = useState(props.client.ContactName);
  const [email, setEmail] = useState(props.client.email);
  const [number, setNumber] = useState(props.client.number);

  const postData = async () => {
    await fetch(`/api/v1/client/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        id: props.client._id,
        clientName,
        name,
        email,
        number,
      }),
    }).then((res) => res.json);
  };

  const onCreate = async (e) => {
    e.stopPropagation();
    setVisible(false);
    await postData();
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
          <Row className="m-2">
            <h5>
              Edit Client Name :{" "}
              <input
                type="text"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                defaultValue={props.client.name}
                onChange={(e) => setClientName(e.target.value)}
              />
            </h5>
          </Row>
          <Row className="m-2">
            <h5>
              Edit Contact Name :{" "}
              <input
                type="text"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                defaultValue={props.client.contactName}
                onChange={(e) => setName(e.target.value)}
              />
            </h5>
          </Row>
          <Row className="m-2">
            <h5>
              Edit Contact Email :{" "}
              <input
                type="text"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                defaultValue={props.client.email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </h5>
          </Row>
          <Row className="m-2">
            <h5>
              Edit Contact Number :{" "}
              <input
                type="text"
                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                defaultValue={props.client.number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </h5>
          </Row>
        </Modal>
      </Button>
    </div>
  );
};

export default Update;
