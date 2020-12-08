import React, {
  useContext, useEffect, useState,
} from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
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
import Reset from './pages/Reset';

import { GlobalContext } from './Context/GlobalState';

const Render = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    async function auth() {
      const user = await localStorage.getItem('user')
      if(user) {
        setIsLoggedIn(true)
      } else {
        console.log('Not logged in')
      }
    }
    auth();
  })

  console.log(isLoggedIn)

  if(isLoggedIn) {
    return (
      <Router>
      <Switch>          
        <Route path="/" component={Home} />

        <Route>
          <Navigation />
          <Route path="/tickets" component={Ticket} />
          <Route path="/monitor" component={Monitor} />
          <Route path="/admin" component={Admin} />
        </Route>
      </Switch>

      <Route exact path="/reset">
        <Reset/>
      </Route>

      <Route path="/signup">
          <div className="login-container">
            <Reg />
          </div>
        </Route>

    </Router>
    )
  } else {
    return (
      <Router>
       <Route path="/login">
          <div className="login-container">
            <Login />
          </div>
        </Route>
    </Router>
    )
  }

}

const App = () => {

  return (
    <Render />
  )
};

export default App;
