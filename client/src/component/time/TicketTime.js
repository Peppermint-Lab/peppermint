import React, { useState } from "react";
import { DatePicker, TimePicker, Input, Space, Button } from "antd";
import moment from "moment";

const TicketTime = () => {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [activity, setActivity] = useState("");

  const format = "HH:mm";

  function onChangeDate(date, dateString) {
    console.log(date);
    setDate(date._d);
  }

  function onChangeStart(time) {
    const t = time;
    const m = moment(t).format("hh:mm");
    setTime(m);
  }

  return (
    <div>
      <Space>
        <DatePicker onChange={onChangeDate} defaultValue={moment} />
        <TimePicker
          defaultValue={moment}
          format={format}
          onChange={onChangeStart}
        />
      </Space>
    </div>
  );
};

export default TicketTime;
