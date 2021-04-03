import React, { useState } from "react";
import { Modal, Input, Button, message } from "antd";

const Reset = (props) => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(props.user._id);
  const [password, setPassword] = useState("");

  const success = () => {
    message.success("Password updated");
  };

  const fail = (f) => {
    message.error(`${f}`);
  };

  const postData = async () => {
    const id = user;
    await fetch(`/api/v1/auth/resetPassword/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
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

  const onCreate = async () => {
    setVisible(false);
    await postData();
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        Reset password
      </Button>
      <Modal
        visible={visible}
        title="Reset users password"
        okText="Update"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter users new password"
        />
      </Modal>
    </div>
  );
};

export default Reset;
