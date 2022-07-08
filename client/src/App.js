/**
 * IFSL3T35 Capstone Project V: Authentication
 *
 * @author Eckard Smuts
 *
 * I consulted the following sites for help:
 *
 * Styling select menus –
 * https://stackoverflow.com/questions/8605516/default-select-option-as-blank
 * https://stackoverflow.com/questions/17608880/how-to-change-the-text-color-of-first-select-option
 *
 * Passing state with useNavigate –
 * https://reach.tech/router/api/navigate
 * https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
 *
 * Setting headers with axios –
 * https://blog.logrocket.com/using-axios-set-request-headers/
 *
 * JWT best practices –
 * https://www.loginradius.com/blog/engineering/guest-post/jwt-authentication-best-practices-and-when-to-use/
 *
 * Making a dropdown component in React –
 * https://www.robinwieruch.de/react-dropdown/
 * https://stackoverflow.com/questions/44786669/warning-use-the-defaultvalue-or-value-props-on-select-instead-of-setting
 *
 * Unchecking radio buttons in React –
 * https://surajsharma.net/blog/react-handle-radio-buttons
 *
 */

import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
// Import components
import Header from "./components/main/Header.js";

import Home from "./components/main/Home.js";
import Welcome from "./components/main/Welcome.js";
import Login from "./components/access/Login.js";
import LoginError from "./components/access/LoginError.js";
import SignUp from "./components/access/SignUp.js";
import SignUpError from "./components/access/SignUpError.js";
import SignUpSuccess from "./components/access/SignUpSuccess.js";
import RegistrationSuccess from "./components/access/RegistrationSuccess.js";
import PageNotFound from "./components/access/PageNotFound.js";
import Repository from "./components/credentials/Repository.js";
import AddCredential from "./components/credentials/AddCredential";
import UpdateCredential from "./components/credentials/UpdateCredential";
import UserList from "./components/users/UserList.js";
import UserForm from "./components/users/UserForm.js";
import UserUpdateError from "./components/users/UserUpdateError.js";
// Import React-Bootstrap components
import { Container, Row, Button } from "react-bootstrap";

function App() {
  // State variables stores token and user role for the current session.
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  // useNavigate allows programmatic navigation.
  let navigate = useNavigate();

  // Function handles form submission in 'Login' component by sending
  // authentication request to server.
  async function handleLoginSubmit(login) {
    try {
      // Passes login values as request body to server.
      const response = await axios.post("/users/login", {
        username: login.username,
        password: login.password,
      });
      // Sets token value to received data.
      setToken(response.data.token);
      navigate("/welcome");
    } catch (err) {
      setError(err);
      navigate("/login-error");
    }
  }

  // Handles logout button click in child components by setting token value to
  // null and navigating to home page.
  const handleLogout = () => {
    setToken(null);
    navigate("/");
  };

  // Function handles form submission in the 'SignUp' component by creating new
  // user in the database.
  async function handleSignUpSubmit(signup) {
    // Defines permitted repository from signup unit and division.
    const repo = { unit: signup.unit, division: signup.division };
    try {
      // Posts signup values to the server
      await axios.post("/users/create", {
        name: signup.name,
        username: signup.username,
        password: signup.password,
        permissions: repo,
      });
      navigate("/signup-success");
    } catch (err) {
      navigate("/signup-error");
    }
  }

  // Function handles form submission in 'CredentialForm' component by sending
  // an add or update request to the server.
  async function handleCredentialSubmit(credential) {
    // Checks if the received credential object has an id value.
    if (credential.id === "") {
      // Calls function to add new credential to the repo.
      addCredential(credential);
    } else {
      updateCredential(credential);
      // Calls function to update existing credential.
    }
  }

  // Helper function posts credential add request to the server.
  const addCredential = async (credential) => {
    try {
      await axios.post("/credentials/create", {
        location: credential.location,
        login: credential.login,
        password: credential.password,
        unit: credential.unit,
        division: credential.division,
      });
      navigate(`/credentials/${credential.unit}/${credential.division}`);
    } catch (err) {
      setError(err);
    }
  };

  // Helper function posts credential update request to the server.
  const updateCredential = async (credential) => {
    try {
      await axios.put(`/credentials/update/${credential._id}`, {
        location: credential.location,
        login: credential.login,
        password: credential.password,
        unit: credential.unit,
        division: credential.division,
      });
      navigate(`/credentials/${credential.unit}/${credential.division}`);
    } catch (err) {
      setError(err);
    }
  };

  // Function handles form submission in 'UserForm' component by sending
  // an update request to the server.
  async function handleUserSubmit(user, newUnit, newDivision, removeDivision) {
    // Removes required division passed from UserForm component from user permissions in state
    if (!(removeDivision === null)) {
      user.permissions.splice(removeDivision, 1);
    }
    // Adds new division passed from UserForm component to user permissions
    if (!(newUnit === null) && !(newDivision === null)) {
      // Variable is used to manage adding of new permissions to user array.
      let addPermission = true;
      // Checks if unit + division is already present in array, in which case it
      // is not added to the user's permissions.
      user.permissions.forEach((item) => {
        console.log(item);
        if (item.unit === newUnit && item.division === newDivision) {
          addPermission = false;
        }
      });
      if (addPermission)
        user.permissions.push({ unit: newUnit, division: newDivision });
    }

    try {
      // Posts user values to the server
      await axios.put(`/users/update/${user._id}`, {
        permissions: user.permissions,
        role: user.role,
      });
      navigate("/users");
    } catch (err) {
      navigate("/users-error");
    }
  }
  // Renders the app.
  return (
    <Container className="app">
      <Row className="header p-4 mb-2">
        <Header token={token} />
      </Row>
      <Row className="main-display">
        <Routes>
          <Route exact={true} path="/" element={<Home />} />
          <Route
            path="/login"
            element={<Login handleLoginSubmit={handleLoginSubmit} />}
          />
          <Route path="login-error" element={<LoginError error={error} />} />
          <Route
            path="/signup"
            element={<SignUp handleSignUpSubmit={handleSignUpSubmit} />}
          />
          <Route path="/signup-error" element={<SignUpError />} />
          <Route path="/signup-success" element={<SignUpSuccess />} />
          <Route
            path="/registration-success"
            element={<RegistrationSuccess />}
          />
          <Route path="/welcome" element={<Welcome token={token} />} />
          <Route
            path="/credentials/:unit/:division"
            element={<Repository token={token} />}
          />
          <Route
            path="/credentials/:unit/:division/add"
            element={
              <AddCredential handleCredentialSubmit={handleCredentialSubmit} />
            }
          />
          <Route
            path="/credentials/:unit/:division/update/:id"
            element={
              <UpdateCredential
                handleCredentialSubmit={handleCredentialSubmit}
              />
            }
          />
          <Route path="/users" element={<UserList />} />
          <Route
            path="/users/update/:id"
            element={<UserForm handleUserSubmit={handleUserSubmit} />}
          />
          <Route path="/users-error" element={<UserUpdateError />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Row>
      {token ? (
        <Row className="logout m-5 mb-3 p-3">
          <Button
            className="logout-button mb-3 mt-3"
            size="sm"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Row>
      ) : (
        <div />
      )}
    </Container>
  );
}

export default App;
