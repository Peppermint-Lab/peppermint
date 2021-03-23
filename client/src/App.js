import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import 'antd/dist/antd.css';

import UserDash from './pages/UserDash'

const Routing = () => {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={UserDash} />
  
          
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
