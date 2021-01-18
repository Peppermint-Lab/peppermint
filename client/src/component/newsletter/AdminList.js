import React, { useState, useEffect } from "react";
import { Table, Button, Space } from "antd";

import ViewNewsletter from "./ViewNewsletter";
import Edit from "./Edit";

const AdminList = () => {
  const [data, setData] = useState([]);

  console.log(data);

  const getN = async () => {
    await fetch(`/api/v1/newsletter/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setData(res.newsletters);
        }
      });
  };

  const del = async (id) => {
    await fetch(`/api/v1/newsletter/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setData(res.newsletters);
        }
      });
  };

  useEffect(() => {
    getN();
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
          <Button onClick={() => del(record._id)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Table
        className="your-table"
        dataSource={data}
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
