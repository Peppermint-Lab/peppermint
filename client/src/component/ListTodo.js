import React, { useEffect, useContext, useState } from "react";
import { Divider, Icon, Tooltip, Whisper } from "rsuite";

import { baseUrl } from "../utils";
import { GlobalContext } from '../Context/GlobalState';

const ListTodo = () => {

  const { todos, getTodos } = useContext(GlobalContext);  

  // const [data, setData] = useState([todos]);

  console.log(todos)

  useEffect(() => {
    getTodos();
     // eslint-disable-next-line
  }, []);

  const allDone = () => {
    fetch(`${baseUrl}/api/v1/todo/markAllAsDone`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
        Accept: "application/json",
      },
    }).then((response) => response.json());
  };

  const oneDone = (item) => {
    fetch(`${baseUrl}/api/v1/todo/markOneAsDone/${item._id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
        Accept: "application/json",
      },
    }).then((response) => response.json());
  };

  const removeTodo = (id) => {
    fetch(`${baseUrl}/api/v1/todo/deleteTodo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          window.location.reload();
          return;
        } else {
          console.log(data.error);
        }
      });
  };

  const tooltip1 = <Tooltip>Remove Todo</Tooltip>;
  const tooltip2 = <Tooltip>Mark as done</Tooltip>;

  return (
    <div>
      <button style={{ marginTop: 10 }} onClick={allDone}>
        Mark All Done
      </button>
      <Divider orientation="left" style={{ width: "auto" }}></Divider>
      {todos.map(todo => {
        // console.log(todo)
        return (
          <div className="todo-list" key={todo._id}>
            <ul key={todo._id}>
              <li style={{ marginLeft: -35 }} key={todo._id}>
                <span className={todo.done ? "done" : ""}>{todo.text}</span>
                <Whisper placement="bottom" trigger="hover" speaker={tooltip1}>
                  <button onClick={() => {removeTodo(todo._id); window.location.reload()}} style={{ float: "right"}}><Icon icon="close" /></button>
                </Whisper>
                <Whisper placement="bottom" trigger="hover" speaker={tooltip2}>
                  <button
                    onClick={() => {oneDone(todo); window.location.reload()}}
                    style={{ float: "right", marginRight: 5 }}
                  >
                    <Icon icon="check" />
                  </button>
                </Whisper>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ListTodo;
