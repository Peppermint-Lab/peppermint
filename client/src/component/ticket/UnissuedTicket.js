import React, { useEffect, useContext } from "react";
import { Table, Space, Button } from "antd";

import ViewTicket from "./ViewTicket.js";
import { GlobalContext } from "../../Context/GlobalState";

const UnissuedTicket = () => {

  const { unissuedTicket, getUnissuedTicket } = useContext(GlobalContext);

  console.log(unissuedTicket)

  useEffect(() => {
    getUnissuedTicket();
    // eslint-disable-next-line
  }, []);

  const convert = () => {
    fetch(`/api/v1/tickets/convertTicket`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
      
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          window.location.reload();
          console.log("Congrats it worked");
        }
      });
  };

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
          <Button size="small" onClick={convert}>
            Convert
          </Button>
          <Button size="small">
            <ViewTicket ticket={record} />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h3 style={{ textAlign: "center" }}>Unissued Tickets </h3>
      <Table
        columns={columns}
        dataSource={unissuedTicket}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          pageSizeOptions: ["10", "20", "30"],
        }}
      />
    </div>
  );
};

export default UnissuedTicket;
