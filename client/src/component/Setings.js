import React, { useState } from "react";
import { Button, Modal } from "antd";
import { useHistory } from "react-router-dom";
// import {UserContext} from '../App'

const Setings = () => {
  const history = useHistory();

  const [visible, setVisible] = useState(false);

  const onCancel = () => {
    setVisible(false);
  };

  function logout() {
    localStorage.clear();
    history.push("/login");
  }

  return (
    <div>
      <Button
        type="text"
        size="small"
        key={0}
        onClick={() => {
          setVisible(true);
        }}
      >
        Settings
      </Button>
      <Modal
       keyboard={true}
       visible={visible}
       mask={true}
       title="Settings"
       okText="Exit"
       onOk={onCancel}
       onCancel={onCancel}
     >
      <Button onClick={logout}>Logout</Button>
      </Modal>
    </div>
  );
};

export default Setings;
