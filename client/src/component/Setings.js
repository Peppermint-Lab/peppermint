import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import { EditTwoTone } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
// import {UserContext} from '../App'

import { baseUrl } from "../utils";

const Setings = () => {
  const history = useHistory();

  const [visible, setVisible] = useState(false);
  const [password, setPassword] = useState("");

  const onCancel = () => {
    setVisible(false);
  };

  function logout() {
    localStorage.clear();
    history.push("/login");
  }

  const resetPassword = async () => {
    await fetch(`${baseUrl}/api/v1/auth/resetPassword/user`, {
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

  return (
    <div>
      <Button
        type="text"
        size="small"
        key={0}
        onClick={() => {
          setVisible(true);
        }}
      >
        Settings
      </Button>
      <Modal
        keyboard={true}
        visible={visible}
        mask={true}
        title="Settings"
        okText="Exit"
        onOk={onCancel}
        onCancel={onCancel}
      >
        <Input placeholder="Enter new Password ... " style={{ width: 200}}  onChange={(e) => {
          setPassword(e.target.value);
        }}/>
        <Button onClick={resetPassword} style={{ marginLeft: 10, margin: 5 }}>
        <EditTwoTone />
      </Button>
        <Button onClick={logout}>Logout</Button>
      </Modal>
    </div>
  );
};

export default Setings;
