import React, { useEffect, useContext } from "react";
import { Divider, Icon, Tooltip, Whisper } from "rsuite";

// import { baseUrl } from "../utils";
import { GlobalContext } from '../Context/GlobalState';

const ListTodo = () => {

  const { todos, getTodos, deleteTodo, allDone, markDone } = useContext(GlobalContext);  

  // console.log(todos)

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, []);  

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
                  <button onClick={() => deleteTodo(todo._id)} style={{ float: "right"}}><Icon icon="close" /></button>
                </Whisper>
                <Whisper placement="bottom" trigger="hover" speaker={tooltip2}>
                  <button
                    onClick={() => markDone(todo._id)}
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
