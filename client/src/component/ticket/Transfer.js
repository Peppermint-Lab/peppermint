import React, { useState, useEffect } from "react";
import { Select, Modal, Button } from "antd"

const Transfer = (props) => {
  const { Option } = Select;
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");
  const [visible, setVisible] = useState(false);

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

  const postData = () => {
    fetch(`/api/v1/tickets/transfer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt")
      },
      body: JSON.stringify({
        id,
        find: props.ticket._id
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("Congrats it worked");
        }
      });
  };

  const onCreate = async () => {
    setVisible(false);
    await postData();
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

      <Modal visible={visible} onCancel={onCancel} onOk={onCreate}
      width={300}
      >
        <Select
          style={{ }}
          showSearch
          placeholder="Select a user"
          optionFilterProp="children"
          onChange={setId}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {search}
        </Select>
      </Modal>
    </div>
  );
};

export default Transfer;
