import React, { useEffect, useState } from "react";
import { Table } from "antd";

import ViewNewsletter from "./ViewNewsletter";

const ListNewsletter = () => {

  const [news, setNews ] = useState([]);

  useEffect(() => {
    async function getNewsletter() {
      try {
        await fetch(`/api/v1/newsletter/get/active`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json())
          .then((res) => {
            setNews(res.newsletters)
          })
      } catch (error) {
        console.log(error)
      }
    }
    getNewsletter()
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
        dataSource={news}
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
