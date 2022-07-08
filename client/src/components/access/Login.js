import React, { useState } from "react";
import "./Login.css";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

// Componentt renders a login window.
export default function Login(props) {
  // Sets a state object for rendering login form values.
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  // Sets temp variable for passing new form values to state modifier
  // (setLogin).
  let updatedValue = {};

  // Helper function handles form changes by updating state object values.
  const handleChange = (event) => {
    // Saves current form name and value.
    updatedValue = { [event.target.name]: event.target.value };
    // Updates state based on form input value. Spread syntax keeps other
    // values intact.
    setLogin((login) => ({
      ...login,
      ...updatedValue,
    }));
  };

  // Helper function handles form submission by passing login values to parent
  // component.
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleLoginSubmit(login);
  };

  // Returns the login window.
  return (
    <div>
      <Row className="m-4 mb-2">
        <h3>Login</h3>
      </Row>
      <Row>
        <Col md={3}></Col>
        <Col>
          <form className="login-form m-4 mt-0" onSubmit={handleSubmit}>
            <Row>
              <label>
                Username:
                <br />
                <input
                  className="mt-2 p-1"
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  value={login.username}
                  onChange={handleChange}
                  required
                />
              </label>
            </Row>
            <br />
            <Row>
              <label>
                Password:
                <br />
                <input
                  className="mt-2 p-1"
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={login.password}
                  onChange={handleChange}
                  required
                />
              </label>
            </Row>
            <br />
            <Button type="submit">Submit</Button>
          </form>
        </Col>
        <Col md={3}></Col>
      </Row>
      <Row className="signup-prompt m-4 mb-3 p-3">
        <small>
          Not yet registered?
          <Link to={{ pathname: "/signup" }}>
            <Button className="signup-button" size="sm">
              Sign up
            </Button>
          </Link>
        </small>
      </Row>
    </div>
  );
}
