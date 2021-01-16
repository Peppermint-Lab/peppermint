import React, { useState } from "react";
import { Modal, Input, Radio, Space, Row } from "antd";

const CreateNewsletter = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTittle ]   =   useState('');
  const [text, setText ] = useState('');
  const [active, setActive] = useState(false);

  const { TextArea } = Input;

  const postData = async () => {
    await fetch(`/api/v1/newsletter/create`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          title,
          text,
          active 
        }),
      }).then((res) => res.json());
  }

  const onCreate = async (values) => {
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
        New newsletter
      </p>
      <Modal
        visible={visible}
        title="Create a new user"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={onCreate}
      >
          <div style={{ margin: 25}}>
          <Row>
          <Input placeholder="Enter newsletter tittle here..." style={{ width: 400}} onChange={(e) => setTittle(e.target.value)}/>  
          </Row>
          </div>
          <div>
          <TextArea rows={8} placeholder="Enter newsletter content here..."  onChange={(e) => setText(e.target.value)} />
          </div>
          <div style={{ margin: 25}}>
            <Radio.Group defaultValue={active} value={active} onChange={(e) => setActive(e.target.value)}>
            <Space>
                <Radio.Button value="true">Active</Radio.Button>
                <Radio.Button value="false">Hidden</Radio.Button>
            </Space>
            </Radio.Group>
          </div>
      </Modal>
    </div>
  );
};

export default CreateNewsletter;
