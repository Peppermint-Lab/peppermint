import React, { useReducer, createContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import "./app.css";
import "rsuite/dist/styles/rsuite-default.css";
import "reactjs-popup/dist/index.css";

import Home from "./pages/Home";
import Ticket from "./pages/Ticket";
import Navigation from "./component/Navigation";
import Login from "./pages/Login";
import Reg from "./pages/Reg";
import Monitor from "./pages/Monitor";
import Admin from "./pages/Admin";

import { reducer, initialState } from "./reducer/userReducer";

export const UserContext = createContext();

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <div className="login-container">
            <Login />
          </div>
        </Route>

        <Route path="/signup">
          <div className="login-container">
            <Reg />
          </div>
        </Route>

        <Route>
          <Navigation />
          <Route path="/" component={Home} exact />
        </Route>

        <Route>
          <Navigation />
          <Route path="/tickets" component={Ticket} />
          <Route path="/monitor" component={Monitor} />
          <Route path="/admin" component={Admin} />
        </Route>
      </Switch>
    </Router>
  );
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Routing />
    </UserContext.Provider>
  );
};

export default App;
