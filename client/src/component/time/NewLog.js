import React, { useState } from "react";
import { DatePicker, TimePicker, Input, Space, Button } from "antd";
import moment from "moment";

const NewLog = () => {
  const [date, setDate] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [activity, setActivity] = useState("");

  const format = "HH:mm";

  function onChangeDate(date, dateString) {
    console.log(date);
    setDate(date._d);
  }

  function onChangeStart(time) {
    const t = time;
    const m = moment(t).format("hh:mm")
    setStart(m)
  }

  function onChangeEnd(time) {
    const t = time;
    const m = moment(t).format("hh:mm")
    setEnd(m)
  }

  return (
    <div className="newlog">
      <Space>
        <DatePicker onChange={onChangeDate} defaultValue={moment} />
        <p>Start Time: </p>
        <TimePicker
          defaultValue={moment}
          format={format}
          onChange={onChangeStart}
        />
        <Input
          placeholder="Work completed on ticket ... "
          className="newlog-input"
          style={{ width: 300 }}
          onChange={(e) => setActivity(e.target.value)}
        />
        <p>End Time: </p>
        <TimePicker defaultValue={moment()} format={format} onChange={onChangeEnd} />
        <Button>Submit</Button>
      </Space>
    </div>
  );
};

export default NewLog;
