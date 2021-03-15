import React, { useState, useContext } from "react";
import {
  Input,
  Space,
  Button,
  Drawer,
  Divider,
  Row,
  Popconfirm,
  Dropdown,
  Menu,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

import axios from "axios";

import Transfer from "./Transfer";
import AddInfo from "../client/AddInfo";
import TicketTime from "../time/TicketTime";

import { GlobalContext } from "../../Context/GlobalState";

const ViewTicket = (props) => {
  const [visible, setVisible] = useState(false);
  const [issue, setIssue] = useState(props.ticket.issue);
  const [note, setNote] = useState(props.ticket.note);
  const [name, setName] = useState(props.ticket.name);
  const [email, setEmail] = useState(props.ticket.email);
  const [number, setNumber] = useState(props.ticket.number);
  const [file, setFile] = useState([]);
  const { TextArea } = Input;

  console.log(file);

  const { completeTicket } = useContext(GlobalContext);

  function handleMenuClick(e) {}

  const postData = async () => {
    let data = new FormData();
    data.append("file", file);
    data.append("filename", file.name);
    data.append("ticket", props.ticket._id);

    await axios.post("/api/v1/uploads", data);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <Transfer ticket={props.ticket} />
      </Menu.Item>
      <Menu.Item key="2">
        <Button
          onClick={() => completeTicket(props.ticket._id)}
          style={{ width: 144 }}
        >
          Complete
        </Button>
      </Menu.Item>
      <Menu.Item key="3">
        <AddInfo client={props.ticket} />
      </Menu.Item>
      <Menu.Item key="4">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <Button onClick={() => postData()}>
          <UploadOutlined />
        </Button>
      </Menu.Item>
    </Menu>
  );

  const update = async () => {
    await fetch(`/api/v1/tickets/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
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

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = async () => {
    setVisible(false);
    await update();
  };

  return (
    <div>
      <Dropdown.Button
        overlay={menu}
        key={0}
        onClick={() => {
          showDrawer();
        }}
      >
        View Ticket
      </Dropdown.Button>
      <Drawer
        className="my-drawer"
        placement="right"
        onClose={onClose}
        visible={visible}
        width={600}
      >
        <h2>Client: {props.ticket.client.name}</h2>
        <Space size="middle">
          <Transfer ticket={props.ticket} />
          <Popconfirm
            title="Are you sure you want to complete?"
            onConfirm={() => {
              completeTicket(props.ticket._id);
            }}
          >
            <Button>Complete</Button>
          </Popconfirm>
          <AddInfo client={props.ticket} />
        </Space>
        <Divider />
        <Row>
          <Space>
            <h6>Issue status : {props.ticket.status}</h6>
            <Divider type="vertical" />
          </Space>
        </Row>
        <div className="ticket-view-info">
          <TextArea
            rows={6}
            defaultValue={props.ticket.issue}
            placeholder="Issue goes here ..."
            onChange={(e) => setIssue(e.target.value)}
          />
          <TextArea
            rows={6}
            defaultValue={props.ticket.note}
            placeholder="Job notes goes here ..."
            onChange={(e) => setNote(e.target.value)}
          />
        </div>
        <Divider />
        <div className="ticket-view-contact">
          <h4>Contact Details</h4>
          <h5>
            Contact Name:{" "}
            <Input
              defaultValue={props.ticket.name}
              style={{ width: 250, float: "right" }}
              onChange={(e) => setName(e.target.value)}
            />
          </h5>
          <h5>
            Email:{" "}
            <Input
              defaultValue={props.ticket.email}
              style={{ width: 250, float: "right" }}
              onChange={(e) => setEmail(e.target.value)}
            />
          </h5>
          <h5>
            Number:{" "}
            <Input
              defaultValue={props.ticket.number}
              style={{ width: 250, float: "right" }}
              onChange={(e) => setNumber(e.target.value)}
            />
          </h5>
        </div>
        <Divider />
        <h4>Time Logged to Ticket</h4>
        <TicketTime ticket={props.ticket} />
      </Drawer>
    </div>
  );
};

export default ViewTicket;
