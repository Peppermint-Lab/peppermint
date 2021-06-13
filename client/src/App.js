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
import { Spin } from "antd";

// const LazyMain = React.lazy(() => import("./admin/Main"))

// import Login from "./pages/auth/Login";
// import Settings from "./pages/Settings";
// import Tickets from "./pages/Tickets";
// import Detail from "./components/ticket/Detail";
// import Admin from "./pages/Admin";
// import History from "./pages/History";
// import SideLayout from "./components/navigation/sideLayout";
// import CheckAuth from "./components/wrapper/CheckAuth";

const UserDash = React.lazy(() => import("./pages/UserDash"));
const Tickets = React.lazy(() => import("./pages/Tickets"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Detail = React.lazy(() => import("./components/ticket/Detail"));
const Admin = React.lazy(() => import("./pages/Admin"));
const History = React.lazy(() => import("./pages/History"));
const SideLayout = React.lazy(() =>
  import("./components/navigation/sideLayout")
);
const CheckAuth = React.lazy(() => import("./components/wrapper/CheckAuth"));

const keyMap = {
  CLOSE: ["escape"],
};

const Routing = () => {
  return (
    <Router>
      <React.Suspense fallback={<Spin />}>
        <CheckAuth>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>

            <SideLayout>
              <Route exact path="/">
                <UserDash />
              </Route>

              <Route>
                <Route path="/settings" component={Settings} />
                <Route path="/tickets" component={Tickets} />
                <Route path="/history" component={History} />
                <Route
                  path="/tickets/:id"
                  component={withRouter(Detail)}
                  key={Math.random()}
                />
              </Route>

              <Route>
                <Route path="/admin/:path?">
                  <Route path="/admin/dashboard" component={Admin} />
                </Route>
              </Route>
            </SideLayout>
          </Switch>
        </CheckAuth>
      </React.Suspense>
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
