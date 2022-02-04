import React, { useState } from "react";
import { Pagination } from "antd";
import { TrashIcon, ArrowRightIcon } from "@heroicons/react/solid";
import { useQuery } from "react-query";

async function getTodos() {
  const res = await fetch("/api/v1/todo/get");
  return res.json();
}

export default function ListTodo() {
  const { status, error, data, refetch } = useQuery("repoData", getTodos);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(7);
  const [text, setText] = useState("");

  function handleChange(value) {
    if (value <= 1) {
      setMinValue(0);
      setMaxValue(7);
    } else {
      setMinValue(maxValue);
      setMaxValue(value * 7);
    }
  }

  async function onSubmit() {
    await fetch("/api/v1/todo/create", {
      method: "POST",
      body: JSON.stringify({
        todo: text,
      }),
    }).then(() => {
      refetch();
      setText("");
    });
  }

  async function deleteTodo(id) {
    await fetch(`api/v1/todo/delete/${id}`, {
      method: "POST",
    }).then(() => refetch());
  }

  async function markDone(id) {
    await fetch(`api/v1/todo/mark-done/${id}`, {
      method: "POST",
    }).then(() => refetch());
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center w-full">
        <div className="mt-1 relative shadow-sm w-full">
          <input
            type="text"
            name="text"
            id="text"
            className="w-full text-gray-900 border-none focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            placeholder="Enter todo here..."
            onChange={(e) => {
              setText(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            value={text}
          />
        </div>
        <button type="button" onClick={() => onSubmit()} className="sm:-mr-10">
          <ArrowRightIcon className="h-6 w-6" />
        </button>
      </div>

      {status === "success" && (
        <div>
          {/* <div className={data.todos.length <= 2 ? "hidden" : ""}>
            <button
              type="button"
              className="inline-flex items-center mt-2 px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-white bg-green-400 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Mark All Done
            </button>
          </div> */}
          <div className="mt-4">
            {data.todos ? (
              data.todos.slice(minValue, maxValue).map((todo) => {
                return (
                  <div className="flex flex-col" key={todo.id}>
                    <ul>
                      <li>
                        <span className={todo.done ? "line-through" : ""}>
                          {todo.text}
                        </span>
                        <button
                          onClick={() => deleteTodo(todo.id)}
                          type="button"
                          className="float-right  border border-transparent rounded-full shadow-sm text-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        </button>
                        {/* {todo.done ? (
                          <button
                            onClick={() => markUndone(todo.id)}
                            type="button"
                            className="float-right mr-3 border border-transparent rounded-full shadow-sm text-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <MinusCircleIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </button>
                        ) : (
                          <button
                            onClick={() => markDone(todo.id)}
                            type="button"
                            className="float-right mr-3 border border-transparent rounded-full shadow-sm text-green-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        )} */}
                      </li>
                    </ul>
                  </div>
                );
              })
            ) : (
              <p>None Found</p>
            )}
          </div>
          <Pagination
            className={data.todos.length > 7 ? "mt-2" : "hidden"}
            defaultCurrent={1}
            total={12}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}
