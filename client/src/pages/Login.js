import React, { useState, useContext } from "react";
import {
  Container,
  Content,
  FlexboxGrid,
  Panel,
  Form,
  FormGroup,
  ControlLabel,
  ButtonToolbar,
  Button,
} from "rsuite";
import { useHistory } from "react-router-dom";

import { baseUrl } from "../utils";
import { UserContext } from "../App";

const Login = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const PostData = async () => {
    await fetch(`${baseUrl}/api/v1/auth/login`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          dispatch({ type: "USER", payload: data.user });
          history.push("/");
        } else {
          console.log(data.error);
        }
      });
  };

  return (
    <div>
      <div>
        <Container>
          <Content>
            <FlexboxGrid justify="center">
              <FlexboxGrid.Item colspan={12}>
                <Panel header={<h3>Login</h3>} bordered>
                  <Form fluid>
                    <FormGroup>
                      <ControlLabel>Email</ControlLabel>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ControlLabel>Password</ControlLabel>
                      <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup>
                      <ButtonToolbar>
                        <Button appearance="primary" onClick={() => PostData()}>
                          Sign in
                        </Button>
                        <Button appearance="link">Forgot password?</Button>
                      </ButtonToolbar>
                    </FormGroup>
                  </Form>
                </Panel>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Content>
        </Container>
      </div>
    </div>
  );
};

export default Login;
