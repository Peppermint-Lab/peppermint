import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Spin, Input, notification } from "antd";
import {
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import isEmail from 'validator/es/lib/isEmail';

import logo from "./logo.png";


const Login = () => {
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState("");

  const errorNotification = async () => {
    const args = await {
      message: "Login Error",
      description: [error],
      duration: 3,
    };
    await notification.open(args);
    setToggle(false);
  };

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
          console.log(data);
          if (!data.error && data.auth === true) {
            localStorage.setItem("user", JSON.stringify(data.user));
            setToggle(true);
            setTimeout(() => {
              history.push("/");
            }, 1000);
          } else {
            await setError(data.error)
            await errorNotification();
          }
        });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <Spin spinning={toggle}>
          <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              class="mx-auto h-24 w-auto"
              src={logo}
              alt="logo hasnt loaded properly"
            />
            <h2 class="mt-2 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div class="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <div class="space-y-6">
                <div>
                  <label
                    for="email"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div class="mt-1">
                    <Input
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      id="email"
                      name="email"
                      type="email"
                      autocomplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label
                    for="password"
                    class="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div class="mt-1">
                    <Input.Password
                      prefix={<LockOutlined />}
                      type="password"
                      placeholder="Password"
                      iconRender={(visible) =>
                        visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                      }
                      onChange={(e) => setPassword(e.target.value)}
                      autocomplete="current-password"
                      required
                      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <button
                    onClick={async () => {
                      setToggle(true);
                      if(isEmail(email)) {
                        signin()
                      } else {
                        setError('Invalid Email')
                        await setTimeout(() => {
                          errorNotification()
                        }, 1000)
                      }
                    }}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default Login;
