import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import UserAuthentication from "./pages/UserAuthentication/UserAuthentication";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import jwt from "jsonwebtoken";

const App = () => {
  const [userId, setUserId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const secretKey = "cjhwebsite";

  useEffect(() => {
    const tokenAuthentication = async () => {
      try {
        // stored token is accessed here
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
          // decode the token
          const decodedToken = jwt.decode(storedToken);

          // verify the token on the server side
          const isTokenValid = await jwt.verify(storedToken, secretKey);

          if (isTokenValid) {
            setUserId(decodedToken.userId);
            setIsLoggedIn(true);
          }
        }
      } catch (error) {
        console.error(error.message);
      }
    };

    tokenAuthentication();
  }, []);

  let routes;
  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path={`/user-dashboard/${userId}`} exact>
          <UserDashboard />
        </Route>
        <Redirect to={`/user-dashboard/${userId}`} exact />
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
