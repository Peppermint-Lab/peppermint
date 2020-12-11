import React, { useState, useEffect, useContext } from "react";
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
import {useHistory } from 'react-router-dom'


import Navigation from "../component/Navigation";
import CreateTodo from "../component/CreateTodo";
import ListTodo from "../component/ListTodo";
import TicketStats from "../component/TicketStats";
import ListNote from "../component/ListNote";

// import { baseUrl } from "../utils";
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

  const { notes, saveNote } = useContext(GlobalContext); 

  
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
              saveNote(text, title)
              close()
            }}
          >
            Save Note
          </Button>
          <Button
            className="button"
            onClick={() => {
              console.log('modal closed ');
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
    <div className="Issue-Container">
      <TicketStats />
    </div>
  );
};

const Home = () => {

  // const [data, setData] = useState();
  const history = useHistory();

  useEffect(() => {
    const call = async () => {
      const res = localStorage.getItem('jwt')
      console.log(res)
      if(!res) {
        history.push('/login')
      } else {
        return console.log('logged in')
      }
    }
    call()
  }, [])

  // console.log(data)
  
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
