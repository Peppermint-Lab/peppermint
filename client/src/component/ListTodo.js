import React, { useEffect, useContext } from "react";
import { Divider, Button, Tooltip, Skeleton } from "antd";
import { CheckCircleTwoTone, DeleteTwoTone } from "@ant-design/icons";

// import { baseUrl } from "../utils";
import { GlobalContext } from "../Context/GlobalState";

const ListTodo = () => {
  const { todos, getTodos, deleteTodo, allDone, markDone } = useContext(
    GlobalContext
  );

  // console.log(todos)

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Button style={{ marginTop: 10 }} onClick={allDone}>
        Mark All Done
      </Button>
      <Divider orientation="left" style={{ width: "auto" }}></Divider>
      {todos ? (
        todos.map((todo) => {
          // console.log(todo)
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
                  <Tooltip placement="bottom" title="Mark as done">
                    <Button
                      onClick={() => markDone(todo._id)}
                      style={{ float: "right", marginRight: 5 }}
                    >
                      <CheckCircleTwoTone twoToneColor="#52c41a" />
                    </Button>
                  </Tooltip>
                </li>
              </ul>
            </div>
          );
        })
      ) : (
        <Skeleton />
      )}
    </div>
  );
};

export default ListTodo;
