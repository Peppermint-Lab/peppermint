import React, { useState, useEffect } from "react";
import { Button, Input, Tabs } from "antd";
import { EditTwoTone } from "@ant-design/icons";

import { useHistory } from "react-router-dom";

// import { baseUrl } from "../utils";

const UserProfile = () => {
  const user = localStorage.getItem("user");
  const [info, setInfo] = useState([]);

  const getData = async () => {
    await fetch(`/api/v1/auth/getById`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        user,
      }),
    }).then((res) => res.json);
    setInfo(user);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <h3>User Profile</h3>
      <h4>Name : </h4>
    </div>
  );
};

const ResetPass = () => {
  const [password, setPassword] = useState("");
  const history = useHistory();

  const resetPassword = async () => {
    await fetch(`/api/v1/auth/resetPassword/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        password,
      }),
    }).then((res) => res.json);
    history.push("/");
  };

  return (
    <div>
      <Input
        placeholder="Enter new Password ... "
        style={{ width: 200 }}
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

const Settings = () => {
  const { TabPane } = Tabs;

  return (
    <div>
      <div className="site-layout-content">
        <Tabs defaultActiveKey="1" centered={true}>
          <TabPane tab="Reset" key="2">
            <ResetPass />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default Settings;
