import React, { useEffect, useContext } from "react";
import { Table } from "antd";

import ViewNewsletter from "./ViewNewsletter";

import { GlobalContext } from "../../Context/GlobalState";

const ListNewsletter = () => {
  const { getNewsletter, newsletter } = useContext(GlobalContext);

  useEffect(() => {
    getNewsletter();
  }, []);

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 300,
    },
    {
      key: "action",
      render: (text, record) => <ViewNewsletter n={record} />,
    },
  ];

  return (
    <div>
      <Table
        showHeader={false}
        dataSource={newsletter}
        columns={columns}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["3", "5", "10"],
        }}
      />
    </div>
  );
};

export default ListNewsletter;
