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

import { GlobalContext } from '../Context/GlobalState';
// import { baseUrl } from '../utils'

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const history = useHistory()

  const { signin } = useContext(GlobalContext);

  const onSubmit = async () => {
    signin(email, password)
  }

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
                        <Button appearance="primary" onClick={() => {onSubmit(); setTimeout(() => history.push('/'), 4000)} }>
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
