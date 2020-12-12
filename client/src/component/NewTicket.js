import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  ControlLabel,
  HelpBlock,
  Button,
  ButtonToolbar,
  Radio,
  RadioGroup,
} from "rsuite";
import { Select, Spin, Input } from 'antd';
import { useHistory } from "react-router-dom";

import { baseUrl } from "../utils";

const NewTicket = () => {
  const history = useHistory();

  const { Option } = Select;
  const { TextArea } = Input;
  
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("");
  const [options, setOptions] = useState([]);
  const [clientName, setClientName] = useState('');

  // console.log(options)
  // console.log(company)

  const fetchClients = () => {
    fetch(`${baseUrl}/api/v1/client/allclients`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
      }
    }).then((res) => res.json())
    .then((res) => {
      if(res) {
        // console.log(res)
        setOptions(res.client)
      }
    })
  }

  const postData = () => {
    fetch(`${baseUrl}/api/v1/tickets/createTicket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        company,
        clientName :  clientName,
        issue,
        priority,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log("Congrats it worked");
        }
      });
  };

  useEffect(() => {
    fetchClients()
  }, [])

  const search = options.map(d => <Option key={d._id}>{d.name}</Option>);

  return (
    <div>
      <Form layout="horizontal">
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <Input style={{ width: 200 }} name="name" onChange={(e) => setName(e.target.value)} />
          <HelpBlock tooltip>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Email</ControlLabel>
          <Input
            style={{ width: 200 }}
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <HelpBlock tooltip>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Company</ControlLabel>
          <Select
            showSearch
            style={{ width: 200 }}
            value={company}
            placeholder="Select a Company"
            optionFilterProp="children"
            onChange={setCompany}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {search}
          </Select>,
          <HelpBlock tooltip>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Issue</ControlLabel>
          <TextArea
            rows={5}
            style={{ width: 200 }}
            onChange={(e) => setIssue(e.target.value)}
          />
          <HelpBlock tooltip>Required</HelpBlock>
        </FormGroup>
        <FormGroup>
          <ControlLabel>Priority</ControlLabel>
          <RadioGroup
            name="radioList"
            inline
            appearance="picker"
            defaultValue="A"
            onChange={setPriority}
          >
            <Radio value="Low">Low</Radio>
            <Radio value="Normal">Normal</Radio>
            <Radio value="High">High</Radio>
          </RadioGroup>
        </FormGroup>
        <FormGroup>
          <ButtonToolbar>
            <Button
              appearance="primary"
              onClick={() => {
                postData();
                history.push("/");
              }}
            >
              Submit
            </Button>
            <Button
              appearance="default"
              onClick={() => {
                history.push("/");
              }}
            >
              Cancel
            </Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </div>
  );
};

export default NewTicket;
