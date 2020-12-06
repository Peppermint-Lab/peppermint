import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Button } from "rsuite";
=======
import {
    Button,
  } from "rsuite";
import Popup from 'reactjs-popup';
>>>>>>> bc465a9fe6cd7c87ec103b95f7374b2de4592b35

import { baseUrl } from "../utils";

const ListNote = () => {
  const [data, setData] = useState([]);

<<<<<<< HEAD
  console.log(data);

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
=======
    const [data, setData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isViewOpen, setIsViewOpen] = useState(false);

    const open = () => setIsOpen(true);
    const close = () => setIsOpen(false);

    const openView = () => setIsViewOpen(true);
    const viewClose = () => setIsViewOpen(false);
    
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

      const removeNote = (id) => {
        fetch(`${baseUrl}/api/v1/note/deleteNote/${id}`, {
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

    return (
        <div>
        {data.map((item) => {
        console.log(item)
        return (
          <div key={item._id} className="todo-list">
            <ul>
              <li style={{ marginLeft: -35}} key={item._id}>
                {item.title}
                <Button size="xs" style={{float: "right", marginLeft: 5}} onClick={() => {removeNote(item._id); window.location.reload(false);}}>Delete</Button>
                <Button size="xs" style={{float: "right", marginLeft: 5}} onClick={open}>
                  Edit
                  <Popup modal open={isOpen} closeOnEscape={true}>
                  <div className="modal">
                    <Button className="close" onClick={close}>
                        &times;
                    </Button>
                  </div>
                  </Popup>
                  </Button>
                <Button size="xs" style={{float: "right", marginLeft: 5}} onClick={openView}>
                  View
                  <Popup modal open={isViewOpen} closeOnEscape={true}>
                  <div className="modal">
                    <Button className="close" onClick={viewClose}>
                      &times;
                    </Button>
                      <div className="header"> 
                        <h3>{item.title}</h3>
                      </div>
                      <div className="content">
                        <h5>{item.note}</h5>
                      </div>
                    </div>
                  </Popup>
                  </Button>
>>>>>>> bc465a9fe6cd7c87ec103b95f7374b2de4592b35
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ListNote;
