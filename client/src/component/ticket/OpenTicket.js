import React, { useEffect, useContext } from "react";
import { Table, Space, Button } from "antd";

import ViewTicket from "./ViewTicket.js";
import { GlobalContext } from "../../Context/GlobalState";

const OpenTicket = () => {
  const { openTicket, getOpenTicket } = useContext(GlobalContext);

  useEffect(() => {
    getOpenTicket();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 150,
      responsive: ["md"],
    },
    {
      title: "Client",
      dataIndex: ["client", "name"],
      key: "client",
      width: 75,
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
      width: 30,
      responsive: ["md"],
    },
    {
      title: "Issue",
      dataIndex: "issue",
      key: "issue",
    },
    {
      key: "action",
      width: 100,
      render: (record) => (
        <Space size="middle">
            <ViewTicket ticket={record} />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Open Tickets</h3>
      <Table
        columns={columns}
        dataSource={openTicket}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />
    </div>
  );
};

export default OpenTicket;
