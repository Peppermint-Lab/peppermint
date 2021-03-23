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
    // getTodos,
    deleteTodo,
    allDone,
    markDone,
    markUndone,
  } = useContext(GlobalContext);

  useEffect(() => {
    //getTodos();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Button className="ml-2 mt-1" onClick={allDone}>
        Mark All Done
      </Button>
      <Divider orientation="left" className="w-full"></Divider>
      {todos ? (
        todos.map((todo) => {
          return (
            <div className="todo-list" key={todo._id}>
              <ul key={todo._id}>
                <li style={{ marginLeft: -35 }} key={todo._id}>
                  <span className={todo.done ? "done" : ""}>{todo.text}</span>
                  <Tooltip placement="right" title="Delete">
                    <Button
                      onClick={() => deleteTodo(todo._id)}
                      style={{ float: "right" }}
                    >
                      <DeleteTwoTone twoToneColor="#FF0000" />
                    </Button>
                  </Tooltip>
                  {todo.done ? (
                    <Tooltip placement="left" title="Unmark as done">
                      <Button
                        onClick={() => markUndone(todo._id)}
                        style={{ float: "right", marginRight: 5 }}
                      >
                        <MinusCircleTwoTone />
                      </Button>
                    </Tooltip>
                  ) : (
                    <Tooltip placement="left" title="Mark as done">
                      <Button
                        onClick={() => markDone(todo._id)}
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
        <p></p>
      )}
    </div>
  );
};

export default ListTodo;
