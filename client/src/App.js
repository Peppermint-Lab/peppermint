import React, { useEffect } from "react";
import { HotKeys } from "react-hotkeys";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter,
} from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import io from "socket.io-client";

import UserDash from "./pages/UserDash";
import Login from "./pages/auth/Login";
import Settings from "./pages/Settings";
import Tickets from "./pages/Tickets";
import Detail from "./components/ticket/Detail";
import Admin from "./pages/Admin";
import History from "./pages/History";
import SideLayout from "./components/navigation/sideLayout";
import CheckAuth from "./components/wrapper/CheckAuth";

const keyMap = {
  CLOSE: ["escape"],
};

const Routing = () => {
  return (
    <Router>
      <CheckAuth>
      <Switch>
        <Route exact path="/">
          <SideLayout>
            <UserDash />
          </SideLayout>
        </Route>

        <Route exact path="/login">
          <Login />
        </Route>

        <Route>
          <SideLayout>
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/tickets" component={Tickets} />
            <Route exact path="/history" component={History} />
            <Route
              path="/tickets/:id"
              component={withRouter(Detail)}
              key={Math.random()}
            />
          </SideLayout>
        </Route>

        <Route>
          <Route exact path="/admin/:path?">
            <SideLayout>
              <Route exact path="/admin/dashboard" component={Admin} />
            </SideLayout>
          </Route>
        </Route>
        
      </Switch>
      </CheckAuth>
    </Router>
  );
};

const App = () => {
  useEffect(() => {
    async function soc() {
      const socket = await io.connect("/");
      socket.once("visitor enters", () => console.log(socket.id));
      socket.once("visitor exits", () => socket.disconnect());
    }
    soc();
  }, []);

  return (
    <div>
      <HotKeys keyMap={keyMap}>
        <Routing />
      </HotKeys>
    </div>
  );
};

export default App;
