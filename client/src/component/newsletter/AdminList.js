import React, { useEffect, useContext } from "react";
import { Table, Button, Space } from "antd";

import ViewNewsletter from "./ViewNewsletter";
import Edit from "./Edit";

import { GlobalContext } from "../../Context/GlobalState";

const AdminList = () => {

  const { getNewsletter, newsletters, deleteNewsletter } = useContext(GlobalContext);

  useEffect(() => {
    getNewsletter();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: "50%",
    },
    {
      title: "CreatedBy",
      dataIndex: ["createdBy", "name"],
      key: "CreatedBy",
      width: "25%",
    },
    {
      key: "action",
      width: "25%",
      render: (text, record) => (
        <Space>
          <ViewNewsletter n={record} />
          <Edit n={record} />
          <Button onClick={() => deleteNewsletter(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        className="your-table"
        dataSource={newsletters}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />
    </div>
  );
};

export default AdminList;
