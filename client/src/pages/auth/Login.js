import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form, Input, Button, Image, notification } from "antd";
import {
  UserOutlined,
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";

import logo from "./logo.png";

const Login = () => {
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const errorNotification = async () => {
    const args = await {
      message: "Login Error",
      description: [error],
      duration: 3,
    }
    notification.open(args)
  }

  async function signin() {
    try {
      await fetch(`/api/v1/auth/login`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then(async (data) => {
          console.log(data)
          if (!data.error && data.auth === true) {
            localStorage.setItem("user", JSON.stringify(data.user));
            history.push('/')
          } else {
            setError(data.error)
            setLoading(false)
            await errorNotification()
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
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
            loading={loading}
            onClick={() => {
              setLoading(true)
              signin()
            }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
