import React, { useState, useContext } from "react";
import { Modal, Form, Input } from "antd";

import { GlobalContext } from "../../Context/GlobalState";

const Create = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const [number, setNumber] = useState("");
  const [contactName, setContactName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { createClient } = useContext(GlobalContext);

  const onCreate = async () => {
    setVisible(false);
    await createClient(name, contactName, number, email);
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <button
        onClick={() => setVisible(true)}
        type="button"
        class="inline-flex items-center p-2 border border-transparent rounded-full shadow-sm text-white bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        <svg
          class="h-5 w-5"
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
        title="Add a new client"
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
                message: "Please input the name of your new client!",
              },
            ]}
          >
            <Input
              placeholder="Enter name here..."
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="contact name" label="Contact Name">
            <Input
              placeholder="Enter  here...."
              onChange={(e) => setContactName(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="number" label="Contact Number">
            <Input
              placeholder="Enter number here..."
              onChange={(e) => setNumber(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="email" label="Contact Email">
            <Input
              placeholder="Enter email address here..."
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Create;
