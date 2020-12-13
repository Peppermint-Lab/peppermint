import React, {useEffect, useState,} from 'react'
import { Table, Space, Button, Pagination } from "antd";

import { baseUrl } from "../../utils";

const ClientList = () => {

    const [clientAll, setClientAll] = useState([]);

    const fetchClients = () => {
        fetch(`${baseUrl}/api/v1/client/allclients`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((res) => {
            if (res) {
              setClientAll(res.client);
            }
          });
      };
    
    
      useEffect(() => {
        fetchClients();
      }, []);

      const columns = [
        {
          title: "Client Name",
          dataIndex: "name",
          key: "name",
          width: 150,
        },
        {
          title: "Contact Name",
          dataIndex: 'contactName',
          key: "contactName",
          width: 150,
        },
        {
          title: "Contact Email",
          dataIndex: "email",
          key: "email",
          width: 50,
        },
        {
          title: "Contact Number",
          dataIndex: "number",
          key: "number",
          width: 75
        },
        {
          title: "Action",
          key: "action",
          width: 200,
          render: () => (
            <Space size="middle">
              <Button size="small">Job History</Button>
              <Button size="small">Update Info</Button>
              <Button size="small">Delete</Button>
            </Space>
          ),
        },
      ];

      console.log(clientAll)


    return (
        <div style={{ marginLeft: -30, marginTop: 5}}>
            <Table dataSource={clientAll} columns={columns} Pagenation={false} />
        </div>
    )
}

export default ClientList
