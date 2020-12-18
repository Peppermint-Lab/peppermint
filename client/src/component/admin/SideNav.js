import React from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  HomeTwoTone,
  IdcardTwoTone,
  SmileTwoTone,
  FileTextTwoTone
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import CreateUser from "./CreateUser";
import CreateClient from "./CreateClient";
import CreateNewsletter from "../newsletter/CreateNewsletter";
import AdminList from "../newsletter/AdminList";

const { SubMenu } = Menu;

const SideNav = () => {
  const handleClick = (e) => {
    // console.log("click ", e);
  };

  return (
    <div className="sideNav">
      <Menu
        onClick={handleClick}
        style={{ width: 200, height: "90vh" }}
        className="Admin-Side-Nav"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
      >
        <Menu.Item key="sub1" icon={<HomeTwoTone />}>
          <Link to="/admin/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="sub2" icon={<AppstoreOutlined />}>
          <Link to="/admin/analytics">Analytics</Link>
        </Menu.Item>
        <SubMenu key='sub4' title="Newsletter" icon={<FileTextTwoTone />}>
          <Menu.Item key="15">
            <CreateNewsletter />
          </Menu.Item>
          <Menu.Item key="16">
            <Link to='/admin/newsletters'>All Newsletters</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title="Clients" icon={<SmileTwoTone />}>
          <Menu.Item key="12">
            <CreateClient />
          </Menu.Item>
          <Menu.Item key="13">
            <Link to='/admin/clientView'>Client List</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu key="sub5" icon={<IdcardTwoTone />} title="Authentication">
          <Menu.Item key="9">
            <CreateUser />
          </Menu.Item>
          <Menu.Item key="10">
          <Link to='/admin/viewUsers'>View Users</Link>
          </Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default SideNav;
