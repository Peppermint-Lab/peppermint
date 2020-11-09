import React from "react";
import { Form, FormGroup, FormControl, ControlLabel, HelpBlock, Button, ButtonToolbar, Radio, RadioGroup} from 'rsuite';

const NewTicket = () => {

  return (
    <div>
      <Form layout="horizontal">
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <FormControl name="name" />
          <HelpBlock tooltip>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <FormControl name="email" type="email" />
          <HelpBlock tooltip>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Issue</ControlLabel>
          <FormControl name="textarea" rows={3} componentClass="textarea" />
          <HelpBlock tooltip>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Priority</ControlLabel>
          <RadioGroup name="radioList" inline appearance="picker" defaultValue="A">
            <Radio value="A">Low</Radio>
            <Radio value="B">Normal</Radio>
            <Radio value="C">High</Radio>
          </RadioGroup>
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <Button appearance="primary">Submit</Button>
            <Button appearance="default">Cancel</Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </div>
  );
};

export default NewTicket;
