import React, { useEffect } from "react";
import { HotKeys } from "react-hotkeys";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";
import "./App.css";
import io from "socket.io-client";
import { Spin } from "antd";

import error from "./assets/404.svg";

const Home = React.lazy(() => import("./pages/Home"));
const Tickets = React.lazy(() => import("./pages/Tickets"));
const Settings = React.lazy(() => import("./pages/Settings"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Detail = React.lazy(() => import("./components/ticket/Detail"));
const History = React.lazy(() => import("./pages/History"));
const SideLayout = React.lazy(() =>
  import("./components/navigation/sideLayout")
);
const NoteBook = React.lazy(() => import("./pages/NoteBook"));

const CheckAuth = React.lazy(() => import("./hoc/CheckAuth"));
const AdminMain = React.lazy(() => import("./pages/admin/Main"));
const AdminNews = React.lazy(() => import("./pages/admin/Newsletters"));
const AdminClient = React.lazy(() => import("./pages/admin/Client"));
const AdminAuth = React.lazy(() => import("./pages/admin/Auth"));

const keyMap = {
  CLOSE: ["escape"],
};

const Loader = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <Spin size="large" />
    </div>
  );
};

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
      <img src={error} className="h-1/2 w-1/2" alt="404" />
    </div>
  );
};

const Routing = () => {
  return (
    <Router>
      <React.Suspense fallback={<Loader />}>
        <CheckAuth>
          <Switch>
            <Route path="/login" component={Login} />

            <SideLayout>
              <Route exact path="/" component={Home} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/tickets" component={Tickets} />
              <Route exact path="/history" component={History} />
              <Route exact path="/notebook" component={NoteBook} />
              <Route exact path="/tickets/:id" component={Detail} />
              <Route exact path="/admin/:path?">
                <Route exact path="/admin/dashboard" component={AdminMain} />
                <Route exact path="/admin/newsletters" component={AdminNews} />
                <Route exact path="/admin/clients" component={AdminClient} />
                <Route exact path="/admin/internal" component={AdminAuth} />
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
