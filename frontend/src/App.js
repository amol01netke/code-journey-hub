import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import UserAuthentication from "./pages/UserAuthentication/UserAuthentication";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import { useState, useEffect } from "react";
import AddProfile from "./pages/AddProfile/AddProfile";
import EditProfile from "./pages/EditProfile/EditProfile";
import AboutUs from "./pages/AboutUs/AboutUs";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import React from "react";

const App = () => {
  const [storedToken, setStoredToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const localToken = localStorage.getItem("token");

    if (localToken) {
      setStoredToken(localToken);
      setIsLoggedIn(true);
    }
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route
          path="/user-dashboard"
          exact
          render={() => (
            <UserDashboard token={storedToken} setIsLoggedIn={setIsLoggedIn} />
          )}
        />
        <Route
          path="/add-profile"
          exact
          render={() => <AddProfile token={storedToken} />}
        />
        <Route path="/edit-profile" exact render={() => <EditProfile />} />
        <Route path="/about-us" exact render={() => <AboutUs />} />
        <Redirect to="/user-dashboard" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route
          path="/user-authentication"
          exact
          render={() => <UserAuthentication setIsLoggedIn={setIsLoggedIn} />}
        />

        <Redirect to="/user-authentication" />
      </Switch>
    );
  }

  return isLoggedIn ? (
    <Router>
      <div className="App">
        <Header setIsLoggedIn={setIsLoggedIn} />
        {routes}
        <Footer />
      </div>
    </Router>
  ) : (
    <Router>
      <div className="App">{routes}</div>
    </Router>
  );
};

export default App;
