import React, { useState } from "react";
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

// import { baseUrl } from "../../utils.js";

const Reg = () => {
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const PostData = async () => {
    await fetch(`/api/v1/auth/Signup`, {
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
          history.push("/login");
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
                <Panel header={<h3>Sign Up</h3>} bordered>
                  <Form fluid>
                    <FormGroup>
                      <ControlLabel>Name</ControlLabel>
                      <input
                        name="name"
                        onChange={(e) => setName(e.target.value)}
                      />
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
                </Panel>
              </FlexboxGrid.Item>
            </FlexboxGrid>
          </Content>
        </Container>
      </div>
    </div>
  );
};

export default Reg;
