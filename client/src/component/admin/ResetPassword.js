import React, { useEffect, useState } from "react";
import { Modal, Input, Button } from "antd";

const ResetPassword = (props) => {
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState(props.user._id);
  const [password, setPassword] = useState("");

  const postData = async () => {
    const id = user
    await fetch(`/api/v1/auth/resetPassword/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        password,
      }),
    }).then((res) => res.json);
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
        type="default"
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
          <Input onChange={(e) => setPassword(e.target.value)} placeholder="Enter users new password" />
      </Modal>
    </div>
  );
};

export default ResetPassword;
