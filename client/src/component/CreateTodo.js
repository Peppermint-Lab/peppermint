import React, { useState, useContext } from "react";
import { Input, Button } from "antd";
import { EditTwoTone } from "@ant-design/icons";

// import { baseUrl } from "../utils";
import { GlobalContext } from "../Context/GlobalState";

const CreateTodo = () => {
  const [text, setText] = useState("");

  const { addTodo } = useContext(GlobalContext);

  const onSubmit = () => {
    addTodo(text);
  };

  return (
    <div>
      <Input
        style={{ width: 300 }}
        placeholder="Enter Todo... "
        value={text}
        onChange={(e) => {
          setText(e.target.value);
        }}
      />
      <Button onClick={onSubmit} style={{ marginLeft: 10 }}>
        <EditTwoTone />
      </Button>
    </div>
  );
};

export default CreateTodo;
