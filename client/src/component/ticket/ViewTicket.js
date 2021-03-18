import React, { useState, useContext, useEffect } from "react";
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
  DatePicker,
  TimePicker,
  Tooltip,
} from "antd";
import { UploadOutlined, EditTwoTone, DeleteTwoTone } from "@ant-design/icons";

import moment from "moment";

import axios from "axios";

import Transfer from "./Transfer";
import AddInfo from "../client/AddInfo";
import Files from "./Files";

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

  const [date, setDate] = useState(moment().format("MM/DD/YYYY"));
  const [time, setTime] = useState();
  const [activity, setActivity] = useState("");
  const [log, setLog] = useState([]);

  const id = props.ticket._id;

  const format = "HH:mm";

  const { completeTicket } = useContext(GlobalContext);

  function handleMenuClick(e) {}

  const postData = async () => {
    let data = new FormData();
    data.append("file", file);
    data.append("filename", file.name);
    data.append("ticket", props.ticket._id);
    await axios.post("/api/v1/tickets/uploadFile", data);
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

  function onChangeDate(date, dateString) {
    const d = moment(date).format("MM/DD/YYYY");
    setDate(d);
  }

  function onChangeTime(time) {
    const t = time;
    const m = moment(t).format("hh:mm");
    setTime(m);
  }

  async function postTimeData() {
    await fetch(`/api/v1/time/createTime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ticket: props.ticket._id,
        date,
        time,
        activity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("Congrats it worked");
        }
      });
  }

  async function getLogById() {
    await fetch(`/api/v1/time/getLog/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLog(res.log);
      });
  }

  async function deleteLog(id) {
    await fetch(`/api/v1/time/deleteLog/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());
  }

  useEffect(() => {
    getLogById();
  }, []);

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
        <h5>Files Attached to ticket</h5>
        <Files ticket={props.ticket} />
        <Divider />
        <div className="ticket-view-contact">
          <h5>Contact Details</h5>
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
        <div>
          <div className="ticket-log">
            <DatePicker onChange={onChangeDate} defaultValue={moment} />
            <TimePicker
              format={format}
              onChange={onChangeTime}
              allowClear
              placeholder="Duration"
            />
            <Input
              style={{ width: 300 }}
              placeholder="Enter activity here"
              onChange={(e) => setActivity(e.target.value)}
            />
            <Button onClick={postTimeData}>
              <EditTwoTone />
            </Button>
          </div>
          <div className="ticket-logs">
            {log.map((log) => {
              return (
                <div key={log._id}>
                  <ul>
                    <li>
                      <span>{log.date} | </span>
                      <span>{log.time} | </span>
                      <span>{log.user.name} | </span>
                      <span>{log.activity}</span>
                      <Tooltip placement="right" title="Delete">
                        <Button onClick={deleteLog(log._id)}>
                          <DeleteTwoTone twoToneColor="#FF0000" />
                        </Button>
                      </Tooltip>
                    </li>
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default ViewTicket;
