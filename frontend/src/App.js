import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import Redirect from "./Pages/Redirect";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import store from "./Redux";
import React from "react";
import { setCurrentUser, logoutUser } from "./Redux/Actions/userActions";

import { Provider } from "react-redux";

if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "/";
  }
}
function App(props) {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/:token" element={<Redirect />} />

            <Route path="/home" element={<HomePage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
