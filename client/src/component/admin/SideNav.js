import React from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  HomeTwoTone,
  IdcardTwoTone,
  SmileTwoTone,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

import CreateUser from "./CreateUser";
import CreateClient from "./CreateClient";

const { SubMenu } = Menu;

const SideNav = () => {
  const handleClick = (e) => {
    // console.log("click ", e);
  };

  return (
    <div>
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
            <CreateUser>Add new user</CreateUser>
          </Menu.Item>
          <Menu.Item key="10">Edit Roles</Menu.Item>
          <Menu.Item key="11">Reset Password</Menu.Item>
        </SubMenu>
      </Menu>
    </div>
  );
};

export default SideNav;
