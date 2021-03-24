import React, { useEffect, useContext } from "react";
import { Button, Table, Space, Popconfirm } from "antd";
import { DeleteTwoTone } from "@ant-design/icons";

import { GlobalContext } from "../../Context/GlobalState";
import AddNote from "./AddNote";
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
      width: "90%",
    },
    {
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => deleteNote(record._id)}
          >
            <Button size="xs">
              <DeleteTwoTone twoToneColor="#FF0000" />
            </Button>
          </Popconfirm>
        </Space>
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