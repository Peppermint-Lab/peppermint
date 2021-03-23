import React, { useEffect, useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
// import { FeedbackFish } from "@feedback-fish/react";

import { Menu, Layout, Button, Select, Modal, Form, Input, Radio, Space, } from "antd";
import { SettingTwoTone } from "@ant-design/icons";

// import NewTicket from "./ticket/NewTicket";

import { GlobalContext } from "../Context/GlobalState";

const Navigation = () => {
  const history = useHistory();
  const { SubMenu } = Menu;

  const [checkAdmin, setCheckAdmin] = useState(false);
  const [current, setCurrent] = useState();

  function logout() {
    localStorage.clear();
    history.push("/login");
  }

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const { createTicket } = useContext(GlobalContext);

  const { Option } = Select;
  const { TextArea } = Input;

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [issue, setIssue] = useState("");
  const [priority, setPriority] = useState("Normal");

  const [options, setOptions] = useState([] || null);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();

  async function isAdmin() {
    const user = await JSON.parse(localStorage.getItem("user"));
    if (user && user.role === "admin") {
      setCheckAdmin(true);
    } else {
      if (!user) {
        history.push("/Login");
      }
    }
  }

  const fetchClients = async () => {
    await fetch(`/api/v1/client/allclients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res) {
          setOptions(res.client);
        }
      });
  };

  const onCreate = async (e) => {
    e.stopPropagation()
    setVisible(false);
    await createTicket(name, email, company, issue, priority);
  };

  const onCancel = async (e) => {
    await setVisible(false);
    e.stopPropagation()
  };

  useEffect(() => {
    fetchClients();
    isAdmin();
    // eslint-disable-next-line
  }, []);

  const search = options ? options.map((d) => <Option key={d._id}>{d.name}</Option>) : null 

  const Render = () => {
    if (checkAdmin) {
      return (
        <div>
          <Layout>
            <Menu
              mode="horizontal"
              onClick={handleClick}
              defaultSelectedKeys={["0"]}
              selectedKeys={current}
            >
              <Menu.Item key={1}>
                <a
                  href="https://pmint.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Peppermint 🍵
                </a>
              </Menu.Item>
              <Menu.Item key={0} onClick={() => history.push("/")}>
                Home
              </Menu.Item>
              <SubMenu key="SubMenu" title="Tickets">
                <Menu.Item key="tickets:1">
                  <Link to="/ticket/open">Open Tickets</Link>
                </Menu.Item>
                <Menu.Item key="tickets:2">
                  <Link to="/ticket/unissued">Unissued Tickets</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key={3} onClick={() => history.push("/history")}>
                History
              </Menu.Item>
              <Menu.Item
                key={6}
                onClick={() => history.push("/admin/dashboard")}
              >
                Admin
              </Menu.Item>
              <SubMenu
                key="settings-men"
                icon={<SettingTwoTone />}
                style={{ float: "right" }}
              >
                <Menu.Item key="SETTINGS:1">
                  <Link to="/settings">Settings</Link>
                </Menu.Item>
                <Menu.Item key="SETTINGS:2" onClick={logout}>
                  Log out
                </Menu.Item>
              </SubMenu>
              <Menu.Item key={4} style={{ float: "right" }}>
                <div className="ticket-modal">
                  <Button
                    type="primary"
                    size="small"
                    onClick={(e) => {
                      
                      setVisible(true);
                    }}
                  >
                    Create Ticket
                  </Button>
                  <Modal
                    destroyOnClose={true}
                    visible={visible}
                    title="Create new Ticket"
                    onCancel={onCancel}
                    centered
                    onOk={() => {
                      form
                        .validateFields()
                        .then((values) => {
                          form.resetFields();
                          onCreate(values);
                        })
                        .catch((info) => {
                          console.log("Validate Failed:", info);
                        });
                    }}
                    footer={[
                      <Button
                        style={{ float: "left" }}
                        onClick={() => onCancel()}
                      >
                        Cancel
                      </Button>,
                      <Button onClick={() => onCreate()}>Submit</Button>,
                    ]}
                  >
                    <Form
                      size="middle"
                      form={form}
                      layout="vertical"
                      name="form_in_modal"
                      initialValues={{
                        modifier: "public",
                      }}
                    >
                      <Form.Item name="name">
                        <Input
                          placeholder="Enter name here..."
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item name="email">
                        <Input
                          placeholder="Enter email here...."
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item name="Client">
                        <Select
                          showSearch
                          placeholder="Select a client"
                          optionFilterProp="children"
                          onChange={setCompany}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {search || null}
                        </Select>
                      </Form.Item>
                      <Form.Item name="issue" label="Issue">
                        <TextArea
                          rows={5}
                          onChange={(e) => setIssue(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item
                        name="modifier"
                        label="Priority"
                        className="collection-create-form_last-form-item"
                      >
                        <Radio.Group
                          buttonStyle="solid"
                          value={priority}
                          onChange={(e) => setPriority(e.target.value)}
                          style={{ textAlign: "center" }}
                        >
                          <Space>
                            <Radio.Button value="Low">Low</Radio.Button>
                            <Radio.Button value="Normal">Normal</Radio.Button>
                            <Radio.Button value="High">High</Radio.Button>
                          </Space>
                        </Radio.Group>
                      </Form.Item>
                    </Form>
                  </Modal>
                </div>
              </Menu.Item>
            </Menu>
          </Layout>
        </div>
      );
    } else {
      return (
        <div>
          <Layout>
            <Menu
              mode="horizontal"
              onClick={handleClick}
              defaultSelectedKeys={["0"]}
              selectedKeys={current}
            >
              <Menu.Item key="Home Page">
                <a
                  href="https://pmint.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Peppermint 🍵
                </a>
              </Menu.Item>
              <Menu.Item key={0} onClick={() => history.push("/")}>
                Home
              </Menu.Item>
              <SubMenu key="SubMenu" title="Tickets">
                <Menu.Item key="tickets:1">
                  <Link to="/ticket/open">Open Tickets</Link>
                </Menu.Item>
                <Menu.Item key="tickets:2">
                  <Link to="/ticket/unissued">Unissued Tickets</Link>
                </Menu.Item>
              </SubMenu>
              <Menu.Item key={3} onClick={() => history.push("/history")}>
                History
              </Menu.Item>
              <SubMenu
                key="settings-men"
                icon={<SettingTwoTone />}
                style={{ float: "right" }}
              >
                <Menu.Item key="SETTINGS:1">
                  <Link to="/settings">Settings</Link>
                </Menu.Item>
                <Menu.Item key="SETTINGS:2" onClick={logout}>
                  Log out
                </Menu.Item>
              </SubMenu>
              <Menu.Item key={4} style={{ float: "right" }}>
              <div className="ticket-modal">
                  <Button
                    type="primary"
                    size="small"
                    onClick={(e) => {
                      
                      setVisible(true);
                    }}
                  >
                    Create Ticket
                  </Button>
                  <Modal
                    destroyOnClose={true}
                    visible={visible}
                    title="Create new Ticket"
                    onCancel={onCancel}
                    centered
                    onOk={() => {
                      form
                        .validateFields()
                        .then((values) => {
                          form.resetFields();
                          onCreate(values);
                        })
                        .catch((info) => {
                          console.log("Validate Failed:", info);
                        });
                    }}
                    footer={[
                      <Button
                        style={{ float: "left" }}
                        onClick={() => onCancel()}
                      >
                        Cancel
                      </Button>,
                      <Button onClick={() => onCreate()}>Submit</Button>,
                    ]}
                  >
                    <Form
                      size="middle"
                      form={form}
                      layout="vertical"
                      name="form_in_modal"
                      initialValues={{
                        modifier: "public",
                      }}
                    >
                      <Form.Item name="name">
                        <Input
                          placeholder="Enter name here..."
                          name="name"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item name="email">
                        <Input
                          placeholder="Enter email here...."
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item name="Client">
                        <Select
                          showSearch
                          placeholder="Select a client"
                          optionFilterProp="children"
                          onChange={setCompany}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {search || null}
                        </Select>
                      </Form.Item>
                      <Form.Item name="issue" label="Issue">
                        <TextArea
                          rows={5}
                          onChange={(e) => setIssue(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item
                        name="modifier"
                        label="Priority"
                        className="collection-create-form_last-form-item"
                      >
                        <Radio.Group
                          buttonStyle="solid"
                          value={priority}
                          onChange={(e) => setPriority(e.target.value)}
                          style={{ textAlign: "center" }}
                        >
                          <Space>
                            <Radio.Button value="Low">Low</Radio.Button>
                            <Radio.Button value="Normal">Normal</Radio.Button>
                            <Radio.Button value="High">High</Radio.Button>
                          </Space>
                        </Radio.Group>
                      </Form.Item>
                    </Form>
                  </Modal>
                </div>
              </Menu.Item>
            </Menu>
          </Layout>
        </div>
      );
    }
  };

  return (
    <div>
      <Render />
    </div>
  );
};

export default Navigation;
