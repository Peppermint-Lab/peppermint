import React, { useState } from "react";
import {
  Container,
  Content,
  Form,
  FormGroup,
  ControlLabel,
  ButtonToolbar,
  Button,
} from "rsuite";
// import { useHistory } from "react-router-dom";

import { baseUrl } from "../utils";

const CreateUser = () => {
  // const history = useHistory();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

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
                <Button appearance="primary" onClick={() => PostData()}>
                  Sign Up
                </Button>
              </ButtonToolbar>
            </FormGroup>
          </Form>
        </Content>
      </Container>
    </div>
  );
};

const Admin = () => {
  return (
    <div>
      <CreateUser />
    </div>
  );
};

export default Admin;
