import React, { useState, useContext } from "react";
import { Modal, Input, Radio, Space, Row } from "antd";

import { GlobalContext } from "../../Context/GlobalState";

const CreateNewsletter = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [active, setActive] = useState();
  
  const { createNewsletter, getNewsletter, newsletter } = useContext(GlobalContext);

  const { TextArea } = Input;

  const onCreate = async (values) => {
    setVisible(false);
    await createNewsletter(title, text, active)
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
        title="Create a new newsletter"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <div style={{ margin: 25 }}>
          <Row>
            <Input
              placeholder="Enter newsletter tittle here..."
              style={{ width: 400, marginLeft: -25 }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Row>
        </div>
        <div>
          <TextArea
            rows={8}
            placeholder="Enter newsletter content here..."
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div style={{ margin: 25 }}>
          <Radio.Group
            defaultValue={active}
            value={active}
            onChange={(e) => setActive(e.target.value)}
          >
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
