import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select } from "antd";
import { baseUrl } from "../../utils";

const UpdateClient = () => {
  const [visible, setVisible] = useState(false);
  const [clientAll, setClientAll] = useState([]);

  const { Option } = Select;

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

  const search = clientAll.map((d) => <Option key={d._id}>{d.name}</Option>);

  return (
    <div>
     
    </div>
  );
};

export default UpdateClient;
