import React, { useState } from "react";
import "./SignUp.css";
// Import components
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function SignUp(props) {
  // Sets a state object for rendering signup form values and passing a signup
  // object to the parent component on submission.
  const [signup, setSignup] = useState({
    name: "",
    username: "",
    unit: "",
    division: "",
    password: "",
  });

  // Sets temp variable for handling new form values and passing them to state
  // object modifier ('setSignup').
  let updatedValue = {};

  // Helper function handles form changes by updating state object values.
  const handleChange = (event) => {
    // Catches current form value update by reference to form name and value.
    updatedValue = { [event.target.name]: event.target.value };
    // Updates state based on current form input value.
    setSignup((signup) => ({
      ...signup,
      ...updatedValue,
    }));
  };

  // Function handles form submission by passing signup values to parent
  // component.
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleSignUpSubmit(signup);
  };

  return (
    <div>
      <Row className="m-4 mb-2">
        <h3>Sign Up</h3>
      </Row>
      <Row>
        <Col md={3}></Col>
        <Col>
          <form className="signup-form m-4 mt-0" onSubmit={handleSubmit}>
            <Row>
              <label>
                Full Name:
                <input
                  className="mt-2 p-1"
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  onChange={handleChange}
                  required
                />
              </label>
            </Row>
            <br />
            <Row>
              <label>
                Username:
                <input
                  className="mt-2 p-1"
                  type="text"
                  name="username"
                  placeholder="Enter username"
                  onChange={handleChange}
                  required
                />
              </label>
            </Row>
            <br />
            <Row>
              <label className="radio-select">
                Select your unit:
                <label className="radio-option mt-2">
                  <input
                    type="radio"
                    name="unit"
                    value="News Management"
                    onChange={handleChange}
                    required
                  />
                  News Management
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="unit"
                    value="Software Reviews"
                    onChange={handleChange}
                  />
                  Software Reviews
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="unit"
                    value="Hardware Reviews"
                    onChange={handleChange}
                  />
                  Hardware Reviews
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="unit"
                    value="Opinion Publishing"
                    onChange={handleChange}
                  />
                  Opinion Publishing
                </label>
              </label>
            </Row>
            <br />
            <Row>
              <label>
                Select your division:
                <br />
                <select
                  className="select-division mt-2 p-1"
                  name="division"
                  defaultValue={"--Choose Division--"}
                  onChange={handleChange}
                  required
                >
                  <option value="">--Choose Division--</option>
                  <option value="Finance">Finance</option>
                  <option value="IT">IT</option>
                  <option value="Writing">Writing</option>
                  <option value="Development">Development</option>
                  <option value="Operations">Operations</option>
                  <option value="Management">Management</option>
                  <option value="Human Resources">Human Resources</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Legal">Legal</option>
                  <option value="ESG">ESG</option>
                </select>
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
                  onChange={handleChange}
                  required
                />
              </label>
            </Row>
            <br />
            <div className="register-button">
              <Button type="submit">Register</Button>
            </div>
          </form>
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}
