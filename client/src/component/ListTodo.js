import React, { useState, useEffect } from 'react'
import { Divider } from 'rsuite';


import { baseUrl } from "../utils";

const ListTodo = () => {

    const [data, setData] = useState([]);

    async function loadContent() {
        await fetch(`${baseUrl}/api/v1/todo//getTodo`, {
              method: 'get',
              headers:{
                  "Authorization":"Bearer "+localStorage.getItem("jwt"),
                  "ContentType": "application/json"
              }
          })
          .then(res => res.json())
          .then(result=>{
              setData(result.todo)
          })
      }
  
      useEffect(()=>{
          async function resolve() {
              await loadContent();
                }
            resolve();
         }, [setData]);

    console.log(data)


    return (
        <div>
            <Divider orientation="left" style={{width: "auto"}}></Divider>
            {       
               data.map(item => {
                    return (
                    <div key={item._id}>
                        <ul>
                        <li>{item.text}</li>
                        </ul>
                    </div>
                    )
                })
            }
        </div>
    )
}

export default ListTodo
