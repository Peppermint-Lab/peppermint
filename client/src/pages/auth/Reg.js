import React, { useState } from "react";
import { Form, Input, Button, Image } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { useHistory } from "react-router-dom";

import logo from "./logo.png";

const Reg = () => {
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const PostData = async () => {
    await fetch(`/api/v1/auth/Signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          history.push("/login");
        } else {
          console.log(data.error);
        }
      });
  };

  return (
    <div>
      <div>
        <Form
          style={{ position: "absolute" }}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <div className="logo-login">
            <Image alt="logo" src={logo} width={300} preview={false} />
          </div>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Email!",
              },
            ]}
          >
            <Input
              style={{ width: 300 }}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <Input
              style={{ width: 300 }}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              style={{ width: 300 }}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={() => {
                PostData();
                setTimeout(() => history.push("/"), 4000);
              }}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Reg;
