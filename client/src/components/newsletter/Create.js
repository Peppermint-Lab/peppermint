import React, { useState, useContext } from "react";
import { Modal, Input, Radio, Space, Row } from "antd";

import { GlobalContext } from "../../Context/GlobalState";

const Create = () => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState();
  const [text, setText] = useState();
  const [active, setActive] = useState('false');

  const { createNewsletter } = useContext(GlobalContext);

  const { TextArea } = Input;

  const onCreate = async () => {
    setVisible(false);
    await createNewsletter(title, text, active);
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
        visible={visible}
        title="Create a new newsletter"
        okText="Create"
        cancelText="Cancel"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <div className="m-4 p-2 flex justify-items-center w-full">
          <Row>
            <label for="email" class="sr-only">
              Email
            </label>
            <input
              type="text"
              name="title"
              id="title"
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 w-96 sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter newsletter tittle here..."
              style={{ marginLeft: -25 }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Row>
        </div>
        <div>
          <TextArea
            rows={15}
            className="w-full"
            placeholder="Enter newsletter content here..."
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='mt-4'>
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

export default Create;
