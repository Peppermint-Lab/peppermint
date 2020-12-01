import React from "react";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Button,
} from "rsuite";

const AddPing = () => {
  return (
    <div className="monitor-create">
      <Form layout="inline">
        <FormGroup>
          <ControlLabel>HostName</ControlLabel>
          <FormControl name="hostname" style={{ width: 250 }} />
          <HelpBlock tooltip>Required</HelpBlock>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Address</ControlLabel>
          <FormControl name="address" style={{ width: 160 }} />
          <HelpBlock tooltip>I.P or domain name</HelpBlock>
        </FormGroup>

        <FormGroup>
          <ControlLabel>Keep alive</ControlLabel>
          <FormControl name="number" style={{ width: 160 }} />
          <HelpBlock tooltip>How often you want to ping a server</HelpBlock>
        </FormGroup>

        <Button>Add Host</Button>
      </Form>
    </div>
  );
};

const Monitor = () => {
  return (
    <div>
      <AddPing />
    </div>
  );
};

export default Monitor;
