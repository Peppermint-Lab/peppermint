import React, { useState, useContext } from "react";
import { Modal, Form, Radio } from "antd";

import { GlobalContext } from "../../Context/GlobalState";

const Create = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const { createUser } = useContext(GlobalContext);

  const onCreate = async (values) => {
    setVisible(false);
    await createUser(firstName, lastName, email, password);
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <button
        onClick={() => setVisible(true)}
        type="button"
        className="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
      <Modal
        centered
        visible={visible}
        title="Create a new user"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: "Please input the name of your new user!",
              },
            ]}
          >
            <div className="flex flex-row">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-1/2 sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter first name here..."
              name="name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              className="ml-2 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-1/2 sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter last name here..."
              name="name"
              onChange={(e) => setLastName(e.target.value)}
            />
            </div>
          </Form.Item>
          <Form.Item name="email" label="Email">
            <input
              type="text"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter email here...."
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <input
              type="password"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter password here..."
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            name="modifier"
            className="collection-create-form_last-form-item"
          >
            <Radio.Group>
              <Radio value="user">User</Radio>
              <Radio value="admin">Admin</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Create;
