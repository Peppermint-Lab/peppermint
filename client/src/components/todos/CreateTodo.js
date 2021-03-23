import React, { useState, useContext } from "react";

import { GlobalContext } from "../../Context/GlobalState";

const CreateTodo = () => {
  const [text, setText] = useState("");

  const { addTodo } = useContext(GlobalContext);

  const onSubmit = () => {
    addTodo(text);
  };

  return (
    <div>
        <p>test</p>
    </div>
  );
};

export default CreateTodo;
