import React from "react";
import { useHistory } from "react-router-dom";
import { notification } from "antd";
import SideNav from "../component/admin/SideNav";
// import { GlobalContext } from '../Context/GlobalState';

const Admin = () => {
  const history = useHistory();

  const user = JSON.parse(localStorage.getItem("user"));

  const openNotification = () => {
    notification.open({
      message: 'Insufficent Permissions',
      description:
        'You do not have the correct permissions to view this page',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const Render = () => {
    if (user.role === "admin") {
      return (
        <div>
          <SideNav />
        </div>
      );
    } else {
      openNotification()
      history.push("/");
    }
  };

  return (
    <div>
      <Render />
    </div>
  );
};

export default Admin;
