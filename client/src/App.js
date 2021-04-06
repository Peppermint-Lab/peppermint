import React, { useEffect } from "react";
import { HotKeys } from "react-hotkeys";
import { BrowserRouter as Router, Route, Switch, withRouter  } from "react-router-dom";
import 'antd/dist/antd.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './App.css'
import io from "socket.io-client";

import UserDash from './pages/UserDash'
import Login from './pages/auth/Login'
import Header from './components/navigation/Header';
import Settings from './pages/Settings'
import Tickets from './pages/Tickets'
import Detail from './components/ticket/Detail'
import Admin from './pages/Admin';
import History from "./pages/History";

const keyMap = {
  CLOSE: ["escape"]
};

const Routing = () => {

    return (
      <Router >
        <Switch>
          <Route exact path="/" component={UserDash} />

          <Route exact path="/login">
            <Login />
          </Route>

         <Route>
           <Header />
           <Route exact path="/settings" component={Settings} />
           <Route exact path="/tickets" component={Tickets} />
           <Route exact path="/history" component={History} />
           <Route path ="/tickets/:id" component={withRouter(Detail)} key={Math.random()} />
           <Route exact path="/admin/:path?">
             <Route exact path='/admin/dashboard' component={Admin} />
          </Route>
        </Route> 
  
          
        </Switch>
      </Router>
    );
  };

const App = () => {

  useEffect(() => {
    async function soc() {
      const socket = await io.connect("/");
      socket.on("visitor enters");
      socket.on("visitor exits");
    }
    soc();
  }, []);

    return (
        <div>
          <HotKeys keyMap={keyMap}>
            <Routing />
          </HotKeys>
        </div>
    )
}

export default App
