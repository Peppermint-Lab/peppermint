import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./app.css";
import "rsuite/dist/styles/rsuite-default.css";
import "antd/dist/antd.css";
import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

import Home from "./pages/Home";
import Ticket from "./pages/Ticket";
import Navigation from "./component/Navigation";
import Login from "./pages/auth/Login";
// import Monitor from "./pages/Monitor";
import Dash from './pages/admin/Dash';
import SideNav from './component/admin/SideNav'
import Analytics from './pages/admin/Analytics'
import ClientList from './pages/admin/ClientList'
import EditUserInfo from './pages/admin/EditUserInfo'
import History from './pages/History'
import AdminList from './component/newsletter/AdminList'
import Open from "./pages/ticket/Open";
import Unissued from "./pages/ticket/Unissued";
import Settings from './pages/Settings'

ReactGA.initialize('G-3C28LH0SBN');

const history = createBrowserHistory();

history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

const Routing = () => {
  return (
    <Router history={history} >
      <Switch>
      <Route exact path="/" component={Home} />
      
        <Route exact path="/login">
          <div className="login-container">
            <Login />
          </div>
        </Route>

        <Route>
          <Navigation />
          <Route exact path="/tickets" component={Ticket} />
          <Route exact path='/history' component={History} />
          <Route exact path='/settings' component={Settings} />
          <Route exact path='/ticket/:path'>
            <Route exact path='/ticket/open' component={Open} />
            <Route exact path='/ticket/unissued' component={Unissued} />
          </Route>
          <Route exact path="/admin/:path?">
            <div className="side-navbar">
              <SideNav />
            </div>
            <div className="admin-main">
              <Route exact path="/admin/dashboard" component={Dash} />
              <Route exact path="/admin/Analytics" component={Analytics} />
              <Route exact path="/admin/clientView" component={ClientList} />
              <Route exact path='/admin/viewUsers' component={EditUserInfo} />
              <Route exact path='/admin/newsletters' component={AdminList} />
            </div>
          </Route>
        </Route>

      </Switch>
    </Router>
  );
};


const App = () => {

  return <Routing />;
};

export default App;
