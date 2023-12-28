import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import UserAuthentication from "./pages/UserAuthentication/UserAuthentication";
import UserDashboard from "./pages/UserDashboard/UserDashboard";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/user-dashboard/:userId" exact>
          <UserDashboard />
        </Route>
        <Redirect to="/user-dashboard/:userId" exact />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/user-authentication" exact>
          <UserAuthentication />
        </Route>
        <Redirect to="/user-authentication" exact />
      </Switch>
    );
  }

  return (
    <Router>
      <div className="App">{routes}</div>
    </Router>
  );
};

export default App;
