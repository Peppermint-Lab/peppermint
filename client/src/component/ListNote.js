import React, { useState, useEffect, useContext } from "react";
import { Button } from "rsuite";

//import { baseUrl } from "../utils";
import { GlobalContext } from '../Context/GlobalState';

const ListNote = () => {
  const { notes, getNotes } = useContext(GlobalContext);  

  // console.log(notes)

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      {notes.map((item) => {
        // console.log(item)
        return (
          <div key={item._id} className="todo-list">
            <ul>
              <li style={{ marginLeft: -35 }}>
                {item.title}
                <Button size="xs" style={{ float: "right", marginLeft: 5 }}>
                  Delete
                </Button>
                <Button size="xs" style={{ float: "right", marginLeft: 5 }}>
                  Edit
                </Button>
                <Button size="xs" style={{ float: "right", marginLeft: 5 }}>
                  View
                </Button>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default ListNote;
