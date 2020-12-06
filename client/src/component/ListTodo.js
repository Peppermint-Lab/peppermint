import React, { useState, useEffect } from "react";
import { Divider, Icon, Tooltip, Whisper } from "rsuite";

import { baseUrl } from "../utils";
import useForceUpdate from "../useForceUpdate";

const ListTodo = () => {
  const [data, setData] = useState([]);

  const forceUpdate = useForceUpdate();
  console.log(data)

  async function loadContent() {
    await fetch(`${baseUrl}/api/v1/todo/getTodo`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => { setData(result.todo) });
  }

  useEffect(() => {
    async function resolve() {
      await loadContent();
    }
    resolve();
  }, [setData]);

 // console.log(data);

  const allDone = () => {
    fetch(`${baseUrl}/api/v1/todo/markAllAsDone`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
        Accept: "application/json"
      },
    })
    .then(response => response.json())
  }

  const oneDone = (item) => {
    console.log(item._id)
    fetch(`${baseUrl}/api/v1/todo/markOneAsDone/${item._id}`, {
      method: "PUT",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
        Accept: "application/json"
      },
    })
    .then(response => response.json())
  }

  const removeTodo = (id) => {
    fetch(`${baseUrl}/api/v1/todo/deleteTodo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
    .then(response => response.json())
    .then((data) => {
      if (!data.error) {
        return
      } else {
        console.log(data.error);
      }
    });
  }

  const tooltip1 = <Tooltip>Remove Todo</Tooltip>;
  const tooltip2 = <Tooltip>Mark as done</Tooltip>;

  return (
    <div>
      <button style={{ marginTop: 10}} onClick={allDone}>Mark All Done</button>
      <Divider orientation="left" style={{ width: "auto" }}></Divider>
      {data.map((item) => {
        // console.log(item)
        return (
          <div key={item._id} className="todo-list">
            <ul>
              <li style={{ marginLeft: -35}}>
                <span className={item.done ? 'done' : ''}>{item.text}</span>
                <Whisper placement="bottom" trigger="hover" speaker={tooltip1}>
                  <button onClick={() => {removeTodo(item._id); forceUpdate();}} style={{ float: "right"}}><Icon icon="close" /></button>
                </Whisper>
                <Whisper placement="bottom" trigger="hover" speaker={tooltip2}>
                  <button onClick={() => oneDone(item)} style={{ float: "right", marginRight: 5}}><Icon icon="check" /></button>
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
