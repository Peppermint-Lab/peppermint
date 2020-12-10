import React, {
  useContext, useEffect, useState
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "./app.css";
import "rsuite/dist/styles/rsuite-default.css";

import Home from "./pages/Home";
import Ticket from "./pages/Ticket";
import Navigation from "./component/Navigation";
import Login from "./pages/Login";
import Reg from "./pages/Reg";
import Monitor from "./pages/Monitor";
import Admin from "./pages/Admin";

import { baseUrl } from "./utils";

// import { GlobalContext } from "./Context/GlobalState";


const Routing = () => {

  return (
    <Router>
      <Switch>
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
          
        

        <Route exact path="/" component={Home} /> 

        <Route>
          <Navigation />
          <Route exact path="/tickets" component={Ticket} />
          <Route exact path="/monitor" component={Monitor} />
          <Route exact path="/admin" component={Admin} />
        </Route>
      </Switch>

    </Router>
  );
};

const App = () => {

  return (
      <Routing />
  );
};

export default App;
