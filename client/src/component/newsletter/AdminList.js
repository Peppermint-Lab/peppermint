import React, { useState, useEffect } from "react";
import { Table, Button } from "antd";

import ViewNewsletter from './ViewNewsletter'

import { baseUrl } from "../../utils";

const AdminList = () => {

    const [data, setData ] = useState([]);

    const getN = async () => {
        await fetch(`${baseUrl}/api/v1/newsletter/get`, {
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

    useEffect(() => {
        getN();
    }, [])

    const columns = [
        {
          title: "Title",
          dataIndex: "title",
          key: "title",
          width: 300
        },
        {
          key: "action",
          render: (text, record) => (
            <ViewNewsletter n={record} />
          ),
        },
      ];

    return (
        <div>
            <Table dataSource={data} columns={columns} />
        </div>
    )
}

export default AdminList
