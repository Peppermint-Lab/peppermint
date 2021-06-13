import React, { useEffect, useContext } from "react";
import { Divider, Button, Tooltip } from "antd";
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

  return (
    <div>
      <div className={!todos.length ? "hidden" : ""}>
        <Button className="mt-2" onClick={allDone}>
          Mark All Done
        </Button>
      </div>
      <Divider orientation="left" className="w-full"></Divider>
      {todos ? (
        todos.map((todo) => {
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
    </div>
  );
};

export default ListTodo;
