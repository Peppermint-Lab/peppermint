import React, { useState, useEffect, useContext } from "react";
import { Container, Header, Divider, Button, Icon, Input } from "rsuite";
import Popup from "reactjs-popup";
import { useHistory } from "react-router-dom";

import Navigation from "../component/Navigation";
import CreateTodo from "../component/todo/CreateTodo";
import ListTodo from "../component/todo/ListTodo";
import TicketStats from "../component/ticket/TicketStats";
import ListNote from "../component/note/ListNote";

import { GlobalContext } from "../Context/GlobalState";
import ListNewsletter from "../component/newsletter/ListNewsletter";

const Todo = () => {
  return (
    <div className="Todo-Container">
      <h3>To-do List</h3>
      <Divider style={{}} />
      <CreateTodo />
      <ListTodo />
    </div>
  );
};

const Notes = () => {
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { saveNote } = useContext(GlobalContext);

  const open = () => setModalIsOpen(true);
  const close = () => setModalIsOpen(false);

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
              <div className="header">
                {" "}
                <Input
                  placeholder="Enter Note title here..."
                  onChange={setTitle}
                />
              </div>
              <div className="content">
                <Input
                  placeholder="Enter Note here..."
                  rows={10}
                  componentClass="textarea"
                  onChange={setText}
                />
              </div>
              <div className="actions">
                <Button
                  style={{ marginRight: 20 }}
                  className="button"
                  onClick={() => {
                    console.log("Data sent");
                    saveNote(text, title);
                    close();
                  }}
                >
                  Save Note
                </Button>
                <Button
                  className="button"
                  onClick={() => {
                    console.log("modal closed ");
                    close();
                  }}
                >
                  Close
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
    <div className="Right-Container">
      <TicketStats />
      <Divider />
      <CompanyNews />
    </div>
  );
};

const CompanyNews = () => {
  return (
    <div className="News-Container">
      <h4>Latest News</h4>
      <Divider />
      <ListNewsletter />
    </div>
  );
};

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    async function auth() {
      await fetch(`/api/v1/auth/token`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((response) => {
          console.log(response)
          const res = response;
          if (res.auth === false ) {
            history.push("/login");
          } else {
            return console.log("logged in");
          }
        });
    }
    auth();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Container>
        <Header>
          <Navigation />
        </Header>
      </Container>
      <div className="main-con">
        <Todo />
        <Notes />
        <Issues />
      </div>
    </div>
  );
};

export default Home;
