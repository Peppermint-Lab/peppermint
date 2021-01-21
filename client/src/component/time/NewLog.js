import React, { useState } from "react";
import { DatePicker, TimePicker, Input, Space, Button } from "antd";
import moment from "moment";

const NewLog = () => {
  const [date, setDate] = useState();

  const format = "HH:mm";

  function onChange(date, dateString) {
    console.log(date);
    setDate(date._d);
  }

  return (
    <div className="newlog">
      <Space>
        <DatePicker onChange={onChange} />
        <TimePicker defaultValue={moment()} format={format} />
        <Input
          placeholder="Work completed on ticket ... "
          className="newlog-input"
          style={{ width: 300 }}
        />
        <TimePicker defaultValue={moment()} format={format} />
        <Button>Submit</Button>
      </Space>
    </div>
  );
};

export default NewLog;
