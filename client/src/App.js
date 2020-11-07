import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.css";
import "rsuite/dist/styles/rsuite-default.css";
import 'reactjs-popup/dist/index.css';

import Home from "./pages/Home";
import Ticket from "./pages/Ticket";
import Navigation from "./component/Navigation";
import Login from "./pages/Login";
import Monitor from "./pages/Monitor";

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />

        <Route path="/login">
          <div className="login-container">
            <Login />
          </div>
        </Route>

        <Route>
          <Navigation />
          <Route path="/tickets" component={Ticket} />
          <Route path="/monitor" component={Monitor} />
        </Route>
      </Switch>
    </Router>
  );
};

const App = () => {
  return (
    <div>
      <Routing />
    </div>
  );
};

export default App;
