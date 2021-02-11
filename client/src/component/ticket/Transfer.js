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
      <Button
        key={0}
        onClick={() => {
          setVisible(true);
        }}
      >
        Transfer
      </Button>

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
