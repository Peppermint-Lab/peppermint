import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  Content,
  Divider,
  Button,
  Icon,
  Input,
} from "rsuite";
import Popup from 'reactjs-popup';


import Navigation from "../component/Navigation";
import CreateTodo from "../component/CreateTodo";
import ListTodo from "../component/ListTodo";
import TicketStats from "../component/TicketStats";
import ListNote from "../component/ListNote";

import { baseUrl } from "../utils";
import { GlobalContext } from '../Context/GlobalState';

const Todo = () => {
  return (
    <div className="Todo-Container">
      <h3>Todo List</h3>
      <Divider />
      <CreateTodo />
      <ListTodo />
    </div>
  );
};

const Notes = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  const open = () => setModalIsOpen(true);
  const close = () => setModalIsOpen(false);

  async function loadContent() {
    await fetch(`${baseUrl}/api/v1/todo/getNotes`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
        ContentType: "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setText(result);
      });
  }

  useEffect(() => {
    async function resolve() {
      await loadContent();
    }
    resolve();
  }, []);


  const PostData = async () => {
    await fetch(`${baseUrl}/api/v1/note/saveNote`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text,
        title
      }),
    }).then((res) => res.json());
  };

  return (
    <div className="Notes-Container">
      <h3>
        Notes
        <Button onClick={open} style={{ float: "right" }}>
        <Icon icon="plus" />
        <Popup modal open={modalIsOpen} nested={true}>
        <div className="modal">
        <Button className="close" onClick={close}>
          &times;
        </Button>
        <div className="header"> <Input placeholder="Enter Note title here..." onChange={setTitle} /></div>
        <div className="content">
          <Input placeholder="Enter Note here..." rows={10} componentClass="textarea" onChange={setText} />
        </div>
        <div className="actions">
        <Button
            style={{marginRight: 20}}
            className="button"
            onClick={() => {
              console.log('Data sent');
              PostData()
              close()
              window.location.reload();
            }}
          >
            Save Note
          </Button>
          <Button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
              window.location.reload();
            }}
          >
            close modal
          </Button>
        </div>
      </div>
        </Popup>
        </Button>
      </h3>
      <Divider />
      <ListNote />
    </div>
  );
};

const Issues = () => {
  return (
    <div className="Issue-Container">
      <TicketStats />
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <Container>
        <Header>
          <Navigation />
        </Header>

        <Container>
          <Content>
            <Todo />
          </Content>
        </Container>

        <Container>
          <Notes />
        </Container>

        <Container>
          <Issues />
        </Container>
      </Container>
    </div>
  );
};

export default Home;
