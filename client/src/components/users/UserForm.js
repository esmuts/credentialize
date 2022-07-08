import React, { useState, useEffect } from "react";
import "./UserForm.css";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";

// Component renders an updatable user form.
export default function UserForm(props) {
  // User data stored in state.
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [newUnit, setNewUnit] = useState(null);
  const [newDivision, setNewDivision] = useState(null);
  const [removeDivision, setRemoveDivision] = useState(null);

  // Gets id value from URl parameter
  const { id } = useParams();

  // Sets temp variable for handling new form values and passing them to state
  // object modifier ('setUser').
  let updatedValue = {};

  // Retrieves user when component first loads.
  useEffect(() => {
    // SetTimeout halts other effects until the callback function has executed.
    const timer = setTimeout(() => {
      getUser();
    }, 100);
    // Clearing timeout ensures callback stops executing in the background.
    return () => clearTimeout(timer);
  }, []);

  // Helper function sends request to get user data from server.
  async function getUser() {
    try {
      const result = await axios.get(`/users/find/${id}`);
      // Sets state value to retrieved user value.
      setUser(result.data);
    } catch (err) {
      setError(err);
    }
  }

  // Method handles form changes by updating state object values.
  const handleChange = (event) => {
    // Udpates user role in state, for display and updating purposes.
    if (event.target.name === "role") {
      // Stores updated form value in temporary variable.
      updatedValue = { [event.target.name]: event.target.value };
      // Updates user state to reflect new role.
      setUser((user) => ({
        ...user,
        ...updatedValue,
      }));
    }

    // Stores index of repository to be removed in temporary variable.
    else if (event.target.name === "remove") {
      setRemoveDivision(event.target.value);
    }

    // Stores selected unit in temporary variable
    else if (event.target.name === "unit") {
      setNewUnit(event.target.value);
    }

    // Stores selected division in temporary variable
    else if (event.target.name === "division") {
      setNewDivision(event.target.value);
    }
  };

  // Function handles form submission by passing signup values to parent
  // component.
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleUserSubmit(user, newUnit, newDivision, removeDivision);
  };

  // Returns error message if user could not be retrieved from server.
  if (error) {
    return (
      <div>
        <Row className="m-4 mb-2">
          <p>{error.response.data.msg}</p>
        </Row>
        <Link to={{ pathname: "/" }}>
          <Button className="mb-4">Home</Button>
        </Link>
      </div>
    );

    // Returns load message if data is still being retrieved.
  } else if (!user) {
    return <p>Loading...</p>;

    // Renders component if user data has been retrieved successfully.
  } else {
    // Creates a list of user's current access divisions.
    const accessList = user.permissions.map((item, index) => (
      <li key={item.unit + item.division + index} className="repo-item">
        <small>
          {item.unit}: {item.division}
        </small>
        <input
          type="radio"
          name="remove"
          value={index}
          onChange={handleChange}
        />
      </li>
    ));

    return (
      <div>
        <Row className="m-4 mb-2">
          <h3>
            <strong>{user.name}</strong>
          </h3>
        </Row>
        <Row>
          <p>
            <em>Update the fields you would like to change.</em>
          </p>
        </Row>
        <Row>
          <Col md={3}></Col>
          <Col>
            <form className="user-form m-4 mt-2 mb-2" onSubmit={handleChange}>
              <Row>
                <label>
                  Select a new role:
                  <br />
                  <select
                    className="select-role mt-2 p-1"
                    name="role"
                    value={user.role}
                    onChange={handleChange}
                  >
                    <option value="normal">Normal</option>
                    <option value="manager">Manager</option>
                    <option value="admin">Admin</option>
                  </select>
                </label>
              </Row>
              <br />
              <Row>
                <small>
                  <strong>Current Repository Access:</strong>
                  <p>
                    <em>Select a repository to delete it.</em>
                  </p>
                </small>
                <ul className="user-permissions">{accessList}</ul>
                <br />
                <br />
                <label className="radio-select mt-2">
                  <p>
                    To add a repository, please select a new unit and division.
                  </p>
                  <small>
                    <em>Select unit:</em>
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
                  </small>
                </label>
                <label className="mt-2">
                  <small>
                    Select division:
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
                    <br />
                    <br />
                  </small>
                </label>
              </Row>
            </form>
            <div className="user-submit m-4 mt-2">
              <Button className="m-2" type="submit" onClick={handleSubmit}>
                Submit
              </Button>
              <Link to={{ pathname: `/users` }}>
                <Button className="m-2">Cancel</Button>
              </Link>
            </div>
          </Col>
          <Col md={3}></Col>
        </Row>
      </div>
    );
  }
}
