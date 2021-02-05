import React, { useEffect, useState } from "react";
import { DatePicker, TimePicker, Input, Space, Button, Tooltip } from "antd";
import { EditTwoTone, DeleteTwoTone } from "@ant-design/icons";
import moment from "moment";

const TicketTime = (props) => {
  const [date, setDate] = useState(moment().format("MM/DD/YYYY"));
  const [time, setTime] = useState();
  const [activity, setActivity] = useState("");
  const [log, setLog] = useState([]);

  const format = "HH:mm";

  function onChangeDate(date, dateString) {
    const d = moment(date).format("MM/DD/YYYY");
    setDate(d);
  }

  function onChangeTime(time) {
    const t = time;
    const m = moment(t).format("hh:mm");
    setTime(m);
  }

  async function postData() {
    await fetch(`/api/v1/time/createTime`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
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
    const id = props.ticket._id;
    await fetch(`/api/v1/time/getLog/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setLog(res.log);
      });
  }

  console.log(log);

  useEffect(() => {
    getLogById();
  }, []);

  return (
    <div>
      <Space>
        <DatePicker onChange={onChangeDate} defaultValue={moment} />
        <TimePicker format={format} onChange={onChangeTime} />
        <Input
          style={{ width: 300 }}
          placeholder="Enter activity here"
          onChange={(e) => setActivity(e.target.value)}
        />
        <Button onClick={postData}>
          <EditTwoTone />
        </Button>
      </Space>
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
                    <Button style={{ float: "right" }}>
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
  );
};

export default TicketTime;
