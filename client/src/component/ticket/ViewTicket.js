import React, { useState } from "react";
import { Input, Space, Button, Drawer, Divider, Row, Popconfirm } from "antd";

import Transfer from "./Transfer";

const ViewTicket = (props) => {
  const [visible, setVisible] = useState(false);
  const [issue, setIssue] = useState(props.ticket.issue);
  const [note, setNote] = useState(props.ticket.note);
  const [name, setName] = useState(props.ticket.name);
  const [email, setEmail] = useState(props.ticket.email);
  const [number, setNumber] = useState(props.ticket.number);

  const { TextArea } = Input;

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = async () => {
    setVisible(false);
    await update();
  };

  const complete = async (record) => {
    const id = record;
    await fetch(`/api/v1/tickets/complete/${id}`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    }).then((res) => res.json());
  };

  const update = async () => {
    await fetch(`/api/v1/tickets/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        id: props.ticket._id,
        issue,
        note,
        name,
        email,
        number,
      }),
    }).then((res) => res.json());
  };

  return (
    <div>
      <Button
        type="text"
        size="small"
        key={0}
        onClick={() => {
          showDrawer();
        }}
      >
        View Ticket
      </Button>
      <Drawer className='my-drawer' placement="right" onClose={onClose} visible={visible}>
        <h2>Client: {props.ticket.client.name}</h2>
        <Space size="middle">
          <Transfer ticket={props.ticket} />
          <Popconfirm
            title="Are you sure you want to complete?"
            onConfirm={() => {
              complete(props.ticket._id);
            }}
          >
            <Button>Complete</Button>
          </Popconfirm>
        </Space>
        <Divider />
        <Row>
          <Space>
            <h4>Issue status : {props.ticket.status}</h4>
            <Divider type="vertical" />
            <h4 style={{ marginLeft: 75 }}>
              Engineer assigned : {props.ticket.assignedto.name}
            </h4>
          </Space>
        </Row>
        <Row>
          <TextArea
            rows={6}
            defaultValue={props.ticket.issue}
            style={{ width: "45%" }}
            placeholder="Issue goes here ..."
            onChange={(e) => setIssue(e.target.value)}
          />
          <TextArea
            defaultValue={props.ticket.note}
            style={{ width: "45%", float: "right", marginLeft: 25 }}
            placeholder="Job notes goes here ..."
            onChange={(e) => setNote(e.target.value)}
          />
        </Row>
        <Divider />
        <h4 >Contact Details</h4>
        <h5 >
          Contact Name:{" "}
          <Input
            defaultValue={props.ticket.name}
            style={{ width: 250, float: 'right'}}
            onChange={(e) => setName(e.target.value)}
          />
        </h5>
        <h5 >
          Email:{" "}
          <Input
            defaultValue={props.ticket.email}
            style={{ width: 250, float: 'right' }}
            onChange={(e) => setEmail(e.target.value)}
          />
        </h5>
        <h5 >
          Number:{" "}
          <Input 
            defaultValue={props.ticket.number}
            style={{ width: 250, float: 'right' }}
            onChange={(e) => setNumber(e.target.value)}
          />
        </h5>
        <Divider />
      </Drawer>
    </div>
  );
};

export default ViewTicket;
