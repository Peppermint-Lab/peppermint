import React, { useState, useEffect } from "react";
import { Divider, Icon, Tooltip, Whisper } from "rsuite";

import { baseUrl } from "../utils";

const ListTodo = () => {
  const [data, setData] = useState([]);

  async function loadContent() {
    await fetch(`${baseUrl}/api/v1/todo/getTodo`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.todo);
      });
  }

  useEffect(() => {
    async function resolve() {
      await loadContent();
    }
    resolve();
  }, [setData]);

  console.log(data);

  function Alldone() {
    
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
    .then((data) => {
      if (!data.error) {
        window.location.reload()
        return
      } else {
        console.log(data.error);
      }
    });
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
        window.location.reload()
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
      <button style={{ marginTop: 10}} onClick={Alldone()}>Mark All Done</button>
      <Divider orientation="left" style={{ width: "auto" }}></Divider>
      {data.map((item) => {
        // console.log(item)
        return (
          <div key={item._id}>
            <ul>
              <li>
                <span>{item.text}</span>
                <Whisper placement="bottom" trigger="hover" speaker={tooltip1}>
                  <button onClick={() => removeTodo(item._id)} style={{ float: "right"}}><Icon icon="close" /></button>
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
