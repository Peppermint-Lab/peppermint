import React from "react";
import { Container, Header, Content } from "rsuite";

import Navigation from "../component/Navigation";
import CreateTodo from '../component/CreateTodo';
import ListTodo from "../component/ListTodo";

const Todo = () => {

  return (
    <div className="Todo-Container">
        <h1>Todo List</h1>
        <CreateTodo />
        <ListTodo />
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
      </Container>
    </div>
  );
};

export default Home;
