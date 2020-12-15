import React, { useEffect, useContext, useState } from "react";
import { Button, Skeleton, Modal, Input, Table, Space, Popconfirm } from "antd";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

// import ViewNote from "./note/ViewNote";

import { baseUrl } from "../utils";
import { GlobalContext } from "../Context/GlobalState";
import EditNote from "./note/EditNote";

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
      width: 400
    },
    {
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <EditNote notes={record} />
          <Popconfirm
            title="Are you sure you want to delete?"
            onConfirm={() => deleteNote(record._id)}
          >
            <Button size="xs" style={{ float: "right", marginLeft: 5 }}>
              <DeleteTwoTone twoToneColor="#FF0000" />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table dataSource={notes} columns={columns} showHeader={false} />
    </div>
  );
};

export default ListNote;
