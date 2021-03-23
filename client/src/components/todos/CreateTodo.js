import React, { useState, useContext } from "react";

import { GlobalContext } from "../../Context/GlobalState";

const CreateTodo = () => {
  const [text, setText] = useState("");

  const { addTodo, } = useContext(GlobalContext);

  const onSubmit = () => {
    addTodo(text);
  };

  return (
    <div className="mx-1 p-1">
        <label forHTML="text" class="block text-sm font-medium text-gray-700 ml-1">Create Task</label>
        <div className="flex flex-row">
        <input 
            type="text"
            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md mt-1"
            placeholder="Enter Task... " 
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
        />
        <button class="font-bold px-4 mx-1 rounded" onClick={() => onSubmit()}>
            Submit
        </button>
        </div>
    </div>
  );
};

export default CreateTodo;
