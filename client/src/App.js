import React, {
  useContext, useEffect, useState
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

import { baseUrl } from "./utils";

import { GlobalContext } from './Context/GlobalState';


const Routing = () => {

  const { isLogged, auth } = useContext(GlobalContext);

  const [data, setData] = useState();

  useEffect(() => {
    const call = async () => {
      const res = await fetch(`${baseUrl}/api/v1/auth/token`, {
        method: "post",
        headers: {
          "Content-Type" : "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt"),
          "x-auth-token": localStorage.getItem("jwt")
        },
      }).then((res) => res.json())
      console.log(res)
      setData(res)
    }
    call()
  }, [])

  console.log(data)

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
