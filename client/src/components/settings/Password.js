import React, { useState } from "react";
import { Button, Input, message } from "antd";
import { EditTwoTone } from "@ant-design/icons";

const Password = () => {
  const [password, setPassword] = useState("");

  const success = () => {
    message.success("Password updated");
  };

  const fail = (f) => {
    message.error(`${f}`);
  };

  const resetPassword = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const id = user._id;
    await fetch(`/api/v1/auth/resetPassword/user/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.failed === false) {
          success();
        } else {
          fail(res.message);
        }
      });
  };

  return (
    <div className="m-5 p-1" >
      <h3>Password Reset</h3>
      <Input
        style={{ width: '50%'}}
        placeholder="Enter new Password ... "
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button onClick={resetPassword} style={{ marginLeft: 10, margin: 5 }}>
        <EditTwoTone />
      </Button>
    </div>
  );
};

export default Password;
