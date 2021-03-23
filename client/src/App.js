import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'antd/dist/antd.css';

import UserDash from './pages/UserDash'
import Login from './pages/auth/Login'

const Routing = () => {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={UserDash} />

          <Route exact path="/login">
            <Login />
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
    )
}

export default App
