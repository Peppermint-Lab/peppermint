import React, { useEffect, useContext, useState } from "react";
import { Divider, Button, Tooltip, Pagination } from "antd";
import {
  CheckCircleTwoTone,
  DeleteTwoTone,
  MinusCircleTwoTone,
} from "@ant-design/icons";

import { GlobalContext } from "../../Context/GlobalState";

const ListTodo = () => {
  const {
    todos,
    getTodos,
    deleteTodo,
    allDone,
    markDone,
    markUndone,
  } = useContext(GlobalContext);

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, []);

  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(7)

  function handleChange(value) {
    if(value <= 1) {
      setMinValue(0)
      setMaxValue(7)
    } else {
      setMinValue(maxValue)
      setMaxValue(value * 7)
    }
  }

  return (
    <div>
      <div className={!todos.length ? "hidden" : ""}>
        <Button className="mt-2" onClick={allDone}>
          Mark All Done
        </Button>
      </div>
      <Divider orientation="left" className="w-full"></Divider>
      {todos ? (
        todos.slice(minValue, maxValue).map((todo) => {
          return (
            <div className="flex flex-col mx-auto px-1" key={todo.id}>
              <ul>
                <li>
                  <span className={todo.done ? "done" : ""}>{todo.text}</span>
                  <Tooltip placement="right" title="Delete">
                    <Button
                      ghost
                      onClick={() => deleteTodo(todo.id)}
                      style={{ float: "right" }}
                    >
                      <DeleteTwoTone twoToneColor="#FF0000" />
                    </Button>
                  </Tooltip>
                  {todo.done ? (
                    <Tooltip placement="left" title="Unmark as done">
                      <Button
                        ghost
                        onClick={() => markUndone(todo.id)}
                        style={{ float: "right", marginRight: 5 }}
                      >
                        <MinusCircleTwoTone />
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip placement="left" title="Mark as done">
                      <Button
                        ghost
                        onClick={() => markDone(todo.id)}
                        style={{ float: "right", marginRight: 5 }}
                      >
                        <CheckCircleTwoTone twoToneColor="#52c41a" />
                      </Button>
                    </Tooltip>
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
                className={todos.length > 7 ? "" : "hidden"}
                defaultCurrent={1}
                total={12}
                onChange={handleChange}
              />
    </div>
  );
};

export default ListTodo;
