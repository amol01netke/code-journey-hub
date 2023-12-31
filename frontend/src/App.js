import { useState, useEffect } from "react";
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
  const storedToken = localStorage.getItem("token");

  useEffect(() => {
    if (storedToken) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  }, [storedToken]);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/user-dashboard" exact>
          <UserDashboard token={storedToken} />
        </Route>
        <Redirect to="/user-dashboard" />
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
