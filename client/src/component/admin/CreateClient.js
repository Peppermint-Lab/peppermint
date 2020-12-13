import React, { useState } from 'react'
import { Modal, Form, Input, } from "antd";
import { baseUrl } from "../../utils";


const CreateClient = () => {
    const [visible, setVisible] = useState(false);
    const [form] = Form.useForm();
  
    const [number, setNumber] = useState("");
    const [contactName, setContactName] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
  
    const postData = async () => {
      await fetch(`${baseUrl}/api/v1/client/create`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          name,
          contactName,
          number,
          email
        }),
      }).then((res) => res.json());
    };
  
    const onCreate = async (values) => {
      console.log("Received values of form: ", values);
      setVisible(false);
      await postData();
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
          Create new client
        </p>
        <Modal
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

export default CreateClient
