import React, { useState, useEffect } from "react";
import {
    Button,
  } from "rsuite";

import { baseUrl } from '../utils'

const ListNote = () => {

    const [data, setData] = useState([]);

    console.log(data)

    
    async function loadContent() {
        await fetch(`${baseUrl}/api/v1/note/getNotes`, {
          method: "get",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("jwt"),
            ContentType: "application/json",
          },
        })
          .then((res) => res.json())
          .then((result) => {
            setData(result.note);
          });
      }
    
      useEffect(() => {
        async function resolve() {
          await loadContent();
        }
        resolve();
      }, []);

    return (
        <div>
        {data.map((item) => {
        // console.log(item)
        return (
          <div key={item._id} className="todo-list">
            <ul>
              <li style={{ marginLeft: -35}}>
                {item.title}
                <Button size="xs" style={{float: "right", marginLeft: 5}}>Delete</Button>
                <Button size="xs" style={{float: "right", marginLeft: 5}}>Edit</Button>
                <Button size="xs" style={{float: "right", marginLeft: 5}}>View</Button>
              </li>
            </ul>
          </div>
        );
      })}
        </div>
    )
}

export default ListNote
