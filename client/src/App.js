import React, {
  createContext,
  useEffect,
  useReducer,
  useState
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

const Routing = () => {

  const [loggedIn, setLoggedIn] = useState()

  async function checkAuth(){
    const user = JSON.parse(localStorage.getItem("user"))
    if(user) {
      await setLoggedIn(true)
    } else {
      return
    }
  }

  useEffect(()=>{
    checkAuth()
  }, [])

  // console.log(loggedIn)

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

        <Route exact path="/" component={checkAuth}>
          {loggedIn ? <Redirect to="/dash" /> : <Redirect to="/login" />}
        </Route>
          
        <Route path="/dash" component={Home} />

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

    </Router>
  );
};

const App = () => {

  return (
      <Routing />

  );
};

export default App;
