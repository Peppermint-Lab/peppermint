import React, { useState, useEffect } from "react";
import { Table } from "antd";

// import { baseUrl } from "../../utils";
import ViewNewsletter from "./ViewNewsletter";

const ListNewsletter = () => {

    const [n, setN] = useState([]);

    console.log(n)
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
                setN(res.newsletters);
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
            <Table showHeader={false} dataSource={n} columns={columns} />
        </div>
    )
}

export default ListNewsletter
