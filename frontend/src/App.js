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
import EditAccount from "./pages/EditAccount/EditAccount";
import AboutUs from "./pages/AboutUs/AboutUs";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import React from "react";
import UserProfile from "./pages/UserProfile/UserProfile";

const App = () => {
  const [storedToken, setStoredToken] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const refreshToken = async (token) => {
    try {
      const response = await fetch(
        "https://code-journey-hub.onrender.com/api/refresh-token",
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setStoredToken(data.newToken);
        return true;
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const isTokenExpired = async (token) => {
    try {
      const response = await fetch(
        "https://code-journey-hub.onrender.com/api/check-token-expiry",
        {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ token }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.isExpired;
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const localToken = localStorage.getItem("token");

      if (localToken) {
        const isExpired = await isTokenExpired(localToken);

        if (isExpired) {
          const refreshed = await refreshToken(localToken);

          if (refreshed) {
            setIsLoggedIn(true);
            return;
          }
        } else {
          setStoredToken(localToken);
          setIsLoggedIn(true);
        }
      }
    };

    fetchData();
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
        <Route
          path="/edit-account"
          exact
          render={() => <EditAccount token={storedToken} />}
        />
        <Route path="/about-us" exact render={() => <AboutUs />} />
        <Route
          path="/user-profile/:username"
          exact
          render={() => <UserProfile />}
        />
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
        <Route path="/about-us" exact render={() => <AboutUs />} />
        <Route
          path="/user-profile/:username"
          exact
          render={() => <UserProfile />}
        />
        <Redirect to="/user-authentication" />
      </Switch>
    );
  }

  return isLoggedIn ? (
    <Router>
      <div className="App">
        <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
        {routes}
        <Footer />
      </div>
    </Router>
  ) : (
    <Router>
      <div className="App">
        <Header />
        {routes}
      </div>
    </Router>
  );
};

export default App;
