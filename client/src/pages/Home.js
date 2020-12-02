import React from "react";
import { Container, Header, Content, Icon } from "rsuite";

import Navigation from "../component/Navigation";
import CreateTodo from '../component/CreateTodo';
import ListTodo from "../component/ListTodo";

const Todo = () => {

  return (
    <div className="Todo-Container">
        <h3>Todo List</h3>
        <CreateTodo />
        <ListTodo />
    </div>
  )
}

const Notes = () => {
  return ( 
    <div className="Notes-Container"> 
      <h3>Notes</h3>
    </div>
  )
}

const Issues = () => {
  return (
    <div className="Issue-Container">
      <h3>Issues</h3><Icon />
    </div>
  )
}

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
