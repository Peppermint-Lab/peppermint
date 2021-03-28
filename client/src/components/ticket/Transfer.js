import React, { useState, useEffect, useContext } from "react";
import { Select, Modal, Button } from "antd";

import { GlobalContext } from "../../Context/GlobalState";

const Transfer = (props) => {
  const { Option } = Select;
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [visible, setVisible] = useState(false);

  const ticket = props.ticket._id

  const { transferTicket } = useContext(GlobalContext);

  const fetchUsers = async () => {
    await fetch(`/api/v1/auth/getAllUsers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setUsers(res.users);
        }
      });
  };

  const onCreate = async () => {
    setVisible(false);
    await transferTicket(id, ticket)
  };

  const onCancel = () => {
    setVisible(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const search = users.map((d) => <Option key={d._id}>{d.name}</Option>);

  return (
    <div>
      <button
        className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        onClick={() => {
          setVisible(true);
        }}
      >
        Transfer
      </button>
      <Modal visible={visible} onCancel={onCancel} onOk={onCreate} width={300}>
        <Select
          style={{ width: 200 }}
          showSearch
          placeholder="Select a user"
          optionFilterProp="children"
          onChange={setId}
          filterOption={(input, option) =>
            option.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {search}
        </Select>
      </Modal>
    </div>
  );
};

export default Transfer;

