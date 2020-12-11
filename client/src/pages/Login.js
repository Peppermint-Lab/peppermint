import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import { Form, Input, Button, Space } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

import { GlobalContext } from '../Context/GlobalState';

// import { baseUrl } from '../utils'

const Login = () => {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { signin } = useContext(GlobalContext);

  const onSubmit = async () => {
    signin(email, password)
  }

  return (
    <div>
         <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
          >
            <h1>Member Login</h1>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Email!',
                },
              ]}
            >
              <Input 
              style={{width: 300}} 
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
                  message: 'Please input your Password!',
                },
              ]}
            >
              <Input.Password
                style={{width: 300}}
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button 
              type="primary" 
              htmlType="submit" 
              className="login-form-button" 
              onClick={() => {onSubmit(); setTimeout(() => history.push('/'), 4000)}}
              >
                Log in
              </Button>
            </Form.Item>
        </Form>
    </div>
  );
};

export default Login;