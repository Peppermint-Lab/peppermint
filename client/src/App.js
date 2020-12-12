import React, {useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.css";
import "rsuite/dist/styles/rsuite-default.css";
import "antd/dist/antd.css";

import Home from "./pages/Home";
import Ticket from "./pages/Ticket";
import Navigation from "./component/Navigation";
import Login from "./pages/Login";
import Reg from "./pages/Reg";
import Monitor from "./pages/Monitor";
import Dash from './pages/admin/Dash';
import SideNav from './component/admin/SideNav'
import Analytics from './pages/admin/Analytics'

import { baseUrl } from "./utils";

// import { GlobalContext } from "./Context/GlobalState";

const Routing = () => {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={Home} />
      
        <Route exact path="/login">
          <div className="login-container">
            <Login />
          </div>
        </Route>

        <Route exact path="/signup">
          <div className="login-container">
            <Reg />
          </div>
        </Route>

        <Route>
          <Navigation />
          <Route exact path="/tickets" component={Ticket} />
          <Route exact path="/monitor" component={Monitor} />
          <Route exact path="/admin/:path?">
            <div className="navbar">
              <SideNav />
            </div>
            <div className="admin-main">
              <Route exact path="/admin/dashboard" component={Dash} />
              <Route exact path="/admin/Analytics" component={Analytics} />
            </div>
          </Route>
        </Route>

      </Switch>
    </Router>
  );
};

const App = () => {

  return <Routing />;
};

export default App;
