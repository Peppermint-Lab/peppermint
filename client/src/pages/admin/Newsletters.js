import React, { useEffect, useContext } from "react";
import { Table, Button, Space } from "antd";

import ViewNewsletter from "../../components/newsletter/ViewNewsletter";
import Edit from "../../components/newsletter/Edit";

import { GlobalContext } from "../../Context/GlobalState";

const Newsletters = () => {
  const { getNewsletter, newsletters, deleteNewsletter } = useContext(
    GlobalContext
  );

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
      <main
        className="relative z-0 overflow-y-auto focus:outline-none"
        tabindex="0"
      >
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Newsletters
            </h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="py-4">
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default Newsletters;
