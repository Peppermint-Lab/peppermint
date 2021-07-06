import React, { useEffect, useContext, useState } from "react";
import { Divider, Button, Pagination } from "antd"; import { TrashIcon, CheckIcon, MinusCircleIcon } from "@heroicons/react/solid";

import { GlobalContext } from "../../Context/GlobalState";

const ListTodo = () => {
  const { todos, getTodos, deleteTodo, allDone, markDone, markUndone } =
    useContext(GlobalContext);

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, []);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(7);

  function handleChange(value) {
    if (value <= 1) {
      setMinValue(0);
      setMaxValue(7);
    } else {
      setMinValue(maxValue);
      setMaxValue(value * 7);
    }
  }

  return (
    <div>
      <div className={!todos.length ? "hidden" : ""}>
        {/* <Button className="mt-2" onClick={allDone}>
          Mark All Done
        </Button> */}
        <button type="button" class="mt-2 inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-white bg-green-400 hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Mark All Done
        </button>
      </div>
      <Divider orientation="left" className="w-full" />
      {todos ? (
        todos.slice(minValue, maxValue).map((todo) => {
          return (
            <div className="flex flex-col mx-auto " key={todo.id}>
              <ul>
                <li>
                  <span className={todo.done ? "done" : ""}>{todo.text}</span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    type="button"
                    className="float-right  border border-transparent rounded-full shadow-sm text-red-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <TrashIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {todo.done ? (
                    <button
                      onClick={() => markUndone(todo.id)}
                      type="button"
                      className="float-right mr-3 border border-transparent rounded-full shadow-sm text-blue-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <MinusCircleIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  ) : (
                    <button
                      onClick={() => markDone(todo.id)}
                      type="button"
                      className="float-right mr-3 border border-transparent rounded-full shadow-sm text-green-500 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  )}
                </li>
              </ul>
            </div>
          );
        })
      ) : (
        <p>None Found</p>
      )}
      <Pagination
        className={todos.length > 7 ? "mt-2" : "hidden"}
        defaultCurrent={1}
        total={12}
        onChange={handleChange}
      />
    </div>
  );
};

export default ListTodo;
