import React, { useState, useContext } from "react";
import { Modal, Form, Input, Radio } from "antd";

import { GlobalContext } from "../../Context/GlobalState";

const CreateUser = () => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const { createUser } = useContext(GlobalContext);

  const onCreate = async (values) => {
    setVisible(false);
    await createUser(name, email, password);
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div>
      <p
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Create new user
      </p>
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
            <Input
              placeholder="Enter name here..."
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input
              placeholder="Enter email here...."
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input
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

export default CreateUser;
