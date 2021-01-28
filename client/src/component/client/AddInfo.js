import React, { useState, useEffect } from "react";
import { Modal, Button, Input } from "antd";

const AddInfo = (props) => {
  const [visible, setVisible] = useState(false);
  const [info, setInfo ] = useState();

  const { TextArea } = Input;

  const id = props.client.client._id

  console.log(props.client)

  async function postData() {
    await fetch(`/api/v1/client/createNote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          id,
          note : info
        }),
      }).then((res) => res.json());
  }
  async function getData() {
    await fetch(`/api/v1/client/getNote/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        }
      })
      .then((res) => res.json())
      .then((result) => {
        setInfo(result.find.notes)
      })
  }

  const onCreate = async () => {
    setVisible(false);
    await postData();
  };

  const onCancel = () => {
    setVisible(false);
  };

  useEffect(() => getData(), [])

  return (
    <div>
      <Button
        key={0}
        onClick={() => {
          setVisible(true);
        }}
      >
        Client Information
      </Button>

      <Modal visible={visible} onCancel={onCancel} onOk={onCreate} width={500}>
        <TextArea
          rows={15}
          defaultValue={info}
          style={{ marginTop: 20 }}
          placeholder="Client notes goes here ..."
          onChange={(e) => setInfo(e.target.value)}
        />
      </Modal>
    </div>
  );
};

export default AddInfo;
