import React, { useState,  } from "react";
import {
  Container,
  Content,
  Form,
  FormGroup,
  ControlLabel,
  ButtonToolbar,
  Button,
  Modal,
} from "rsuite";
// import { useHistory } from "react-router-dom";
// import {UserContext} from '../App'

import { baseUrl } from "../utils.js";

const CreateUser = () => {
  // const history = useHistory();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const PostData = async () => {
    await fetch(`${baseUrl}/api/v1/auth/Signup`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          window.location.reload();
        } else {
          console.log(data.error);
        }
      });
  };

  return (
    <div className="createUser-container">
      <h4>Add new user</h4>
      <Container>
        <Button onClick={open} >
          Add User
          <Modal
          show={modalIsOpen}
          onHide={close()}
        >
          <Modal.Header>Add a new User</Modal.Header>
          <Modal.Body>
          <Content>
            <Form fluid>
              <FormGroup>
                <ControlLabel>Name</ControlLabel>
                <input name="name" onChange={(e) => setName(e.target.value)} />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <input
                  name="password"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <input
                  name="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <ButtonToolbar>
                  <Button appearance="primary" onClick={() => PostData(), close()}>
                    Add
                  </Button>
                </ButtonToolbar>
              </FormGroup>
            </Form>
          </Content>
          </Modal.Body>
          </Modal>
        </Button>
      </Container>
    </div>
  );
};

const Admin = () => {

  const user = JSON.parse(localStorage.getItem("user"))

  console.log(user.role)

  const Render = () => {
    if(user.role === "admin") {
      return (
        <div>
          <CreateUser />
        </div>
      ) 
    } else {
      return (
        <div>
          <h1>You do not have the permissions to view this Route</h1>
        </div>
      )
    }
  }

  return (
    <div>
      <Render />
    </div>
  );
};

export default Admin;
