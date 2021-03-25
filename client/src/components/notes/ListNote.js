import React, { useEffect, useContext } from "react";
import { Button, Table, Popconfirm } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";

import { GlobalContext } from "../../Context/GlobalState";
import AddNote from "./AddNote";
import ViewNote from "./ViewNote";
// import EditNote from "./EditNote";

const ListNote = () => {
  const { notes, getNotes, deleteNote } = useContext(GlobalContext);

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "name",
      width: "70%",
    },
    {
      key: "action",
      render: (text, record) => (
        <div className="flex flex-row float-right">
          <ViewNote note={record} />
          <Button size="xs" style={{ marginRight: 10}} >Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => deleteNote(record._id)}
          >
            <Button size="xs" style={{ marginRight: 10}}>
              <DeleteTwoTone twoToneColor="#FF0000" />
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-row ">
        <h3>Notes</h3>
        <AddNote />
      </div>
      <Table
        dataSource={notes}
        columns={columns}
        showHeader={false}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />
    </div>
  );
};

export default ListNote;
