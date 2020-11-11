import React, { useState } from "react";
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonToolbar, Radio, RadioGroup} from 'rsuite';

import { baseUrl } from "../utils";

const NewTicket = () => {

  const [name, setName] = useState('')
  const [company, setCompany] = useState('')
  const [email, setEmail] = useState('')
  const [issue, setIssue] = useState('')
  const [priority, setPriority] = useState('')
  
  const postData = () => {
  
      fetch(`${baseUrl}/api/v1/tickets/createTicket`, {
          method: 'POST',
          headers: {
              "Content-Type":"application/json"
          },
          body: JSON.stringify({
              name,
              company,
              issue,
              priority
          })
          })
          .then(res => res.json())
          .then(data => {
              if(data.error) {
                  console.log(data.error)
              } else {
                  console.log("Congrats it worked")
              }
          })
  }

  return (
    <div>
      <Form layout="horizontal">
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <input name="name" onChange={(e) => setName(e.target.value)}/>
          <HelpBlock tooltip>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <input name="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
          <HelpBlock tooltip>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Company</ControlLabel>
          <input name="company" type="text" onChange={(e) => setCompany(e.target.value)}/>
          <HelpBlock tooltip>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Issue</ControlLabel>
          <input name="textarea" rows={3} componentClass="textarea" onChange={(e) => setIssue(e.target.value)}/>
          <HelpBlock tooltip>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Priority</ControlLabel>
          <RadioGroup name="radioList" inline appearance="picker" defaultValue="A" onChange={setPriority}>
            <Radio value="Low">Low</Radio>
            <Radio value="Normal">Normal</Radio>
            <Radio value="High">High</Radio>
          </RadioGroup>
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <Button appearance="primary" onClick={() => postData()}>Submit</Button>
            <Button appearance="default">Cancel</Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </div>
  );
};

export default NewTicket;
