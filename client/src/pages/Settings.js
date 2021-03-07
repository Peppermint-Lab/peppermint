import React, { useState, useEffect } from "react";
import { Button, Divider, Input, Form, message } from "antd";
import { EditTwoTone } from "@ant-design/icons";

import { useHistory } from "react-router-dom";

// eslint-disable-next-line
const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [name, setName] = useState();
  const [email, setEmail] = useState();

  const success = () => {
    message.success("Information updated!");
  };

  const fail = () => {
    message.error("Information failed to update");
  };

  async function postData() {
    await fetch(`/api/v1/auth/profile`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name ? name : user.name,
        email: email ? email : user.email,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.fail === false) {
          localStorage.clear();
          localStorage.setItem("user", JSON.stringify(res.user));
          success();
        } else {
          fail();
        }
      });
  }

  const onFinish = async () => {
    email.toLowerCase();
    await postData();
  };

  const onFinishFail = async () => {
    await fail();
  };

  return (
    <div>
      <h3>
        Account{" "}
        <Button
          onClick={postData}
          disabled={name || email ? false : true}
          type="primary"
          htmlType="submit"
          style={{ float: "right", marginTop: 5 }}
        >
          Save
        </Button>
      </h3>
      <Divider />
      <h5>Profile</h5>
      <p>This information will be linked to your tickets.</p>
      <div>
        <Form
          name="profile"
          initialValues={{ remember: false }}
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFail}
        >
          <Form.Item label="Name">
            <Input
              defaultValue={user.name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Email">
            <Input
              defaultValue={user.email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

const ResetPass = () => {
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
    }).then((res) => res.json())
      .then((res) => {
        if (res.failed === false) {
          success();
        } else {
          fail(res.message);
        }
      });
  };

  return (
    <div>
      <h3>Security</h3>
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

const Version = () => {
  return (
    <div className="version">
      <p>v0.1.7</p>
    </div>
  );
};

const Settings = () => {
  const history = useHistory();

  useEffect(() => {
    async function auth() {
      await fetch(`/api/v1/auth/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          const res = response;
          if (res.auth === false) {
            history.push("/login");
          } else {
            return console.log("logged in");
          }
        });
    }
    auth();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Version />
      <div className="site-layout-content">
        <UserProfile />
        <Divider />
        <ResetPass />
      </div>
    </div>
  );
};

export default Settings;
