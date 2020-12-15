import React, { useEffect, useContext, useState } from "react";
import { Button, Skeleton, Modal, Input } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

// import ViewNote from "./note/ViewNote";

import { baseUrl } from "../utils";
import { GlobalContext } from "../Context/GlobalState";

const ListNote = () => {
  const { notes, getNotes, deleteNote } = useContext(GlobalContext);

  const [visible, setVisible] = useState(false);
  const [note, setNote] = useState("");
  const [id, setId] = useState('');

  const { TextArea } = Input;

  console.log(note)
  console.log(id)

  const postData = async () => {
    await fetch(`${baseUrl}/api/v1/note/updateNote`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        note,
        id
      }),
    }).then((res) => res.json);
  };

  const onCreate = async (e) => {
    e.stopPropagation();
    setVisible(false);
    await postData();
  };

  const onCancel = (e) => {
    e.stopPropagation();
    setVisible(false);
    setId();
    setNote();
  };

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {notes ? (
        notes.map((item) => {
          return (
            <div key={item._id} className="todo-list">
              <ul >
                <li style={{ marginLeft: -35 }}>
                  {item.title}
                  <Button
                    size="xs"
                    style={{ float: "right", marginLeft: 5 }}
                    onClick={() => deleteNote(item._id)}
                  >
                    <DeleteTwoTone twoToneColor="#FF0000" />
                  </Button>
                  <Button
                    size="xs"
                    style={{ float: "right", marginLeft: 5 }}
                    onClick={() => {
                      setVisible(true);
                      setId(item._id)
                      setNote(item.note)
                    }}
                  >
                    <EditTwoTone />
                    <Modal
                      keyboard={true}
                      visible={visible}
                      title={item.title}
                      okText="Update"
                      cancelText="Cancel"
                      onCancel={onCancel}
                      onOk={onCreate}
                    >
                      <TextArea
                        defaultValue={item.note}
                        onChange={(e) => setNote(e.target.value)}
                        rows={5}
                      />
                    </Modal>
                  </Button>
                </li>
              </ul>
            </div>
          );
        })
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default ListNote;
