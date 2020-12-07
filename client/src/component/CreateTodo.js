import React, { useState } from "react";
import { Input, InputGroup, Icon } from "rsuite";

import { baseUrl } from "../utils";

const CreateTodo = () => {
  const [text, setText] = useState("");

  async function postData() {
    await fetch(`${baseUrl}/api/v1/todo/createTodo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text,
      }),
    }).then((res) => res.json());
  }

  return (
    <div>
      <InputGroup>
        <Input
          style={{ width: 300 }}
          placeholder="Enter Todo... "
          onChange={setText}
        />
        <InputGroup.Button>
          <Icon icon="check-square-o" onClick={null} />
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default CreateTodo;
