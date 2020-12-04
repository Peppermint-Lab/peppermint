import React, {useState, useEffect } from "react";
import { Container, Header, Content, Divider, Input, Button } from "rsuite";


import Navigation from "../component/Navigation";
import CreateTodo from "../component/CreateTodo";
import ListTodo from "../component/ListTodo";
import TicketStats from "../component/TicketStats";
// import TextEditor from "../component/NotesEditor";

import { baseUrl } from '../utils'

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

  const [text, setText] = useState('')

  console.log(text)

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
    await fetch(`${baseUrl}/api/v1/todo/saveNote`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text
      }),
    })
      .then((res) => res.json())
  };
  
 return(
   <div className="Notes-Container">
     <h3>Notes<Button style={{float: "right"}} onClick={() => PostData()}>Save</Button></h3>
     <Divider />
     <Input componentClass="textarea" rows={25} defaultValue={text} onChange={setText}/>
   </div>
 )
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
