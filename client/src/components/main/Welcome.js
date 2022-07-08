import React, { useState, useEffect } from "react";
import "./Welcome.css";
import axios from "axios";
import { Link } from "react-router-dom";
// Import React Bootstrap components.
import { Row, Col, Button } from "react-bootstrap";

// Component returns a landing page for logged-in user.
export default function Welcome(props) {
  // State stores user data retrieved from token.
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // Retrieves token data when component first loads.
  useEffect(() => {
    // SetTimeout halts other effects until the callback function has executed.
    const timer = setTimeout(() => {
      getUserData();
    }, 100);
    // Clearing timeout ensures callback stops executing in the background.
    return () => clearTimeout(timer);
  }, []);

  // Helper function verifies token and receives its payload data.
  async function getUserData() {
    try {
      const decodedToken = await axios.get("/users/verify", {
        headers: { Authorization: `Bearer ${props.token}` },
      });
      // Uses retrieved token payload to set user state's values.
      setUserData(await decodedToken.data.decoded);
      // Sets error if the token could not be verified.
    } catch (err) {
      setError(err);
    }
  }

  // Returns error message if userData could not be retrieved from server.
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
  } else if (!userData) {
    return <p>Loading...</p>;

    // Renders component if user data retrieved successfully.
  } else {
    // Creates a list of repositories from user permission data.
    const repoList = userData.permissions.map((item, index) => (
      <Link
        key={item.unit + item.division + index}
        to={{ pathname: `/credentials/${item.unit}/${item.division}` }}
      >
        <li className="p-1">
          <small>
            <em>
              {item.unit}: {item.division}
            </em>
          </small>
        </li>
      </Link>
    ));

    return (
      <div>
        <Row className="m-4 mb-2">
          <h3>Welcome, {userData.name.split(" ")[0]}!</h3>
        </Row>
        <Row>
          <p>
            <em>Select a division below to view its login credentials.</em>
          </p>
        </Row>
        <Row className="m-2 mt-0">
          <Col></Col>
          <Col className="p-4" xs={12} sm={9} md={6}>
            <ul className="repo-list p-0">{repoList}</ul>
          </Col>
          <Col></Col>
        </Row>
        {userData.role === "admin" ? (
          <Row>
            <p>
              <em>Or click here to: </em>
            </p>
            <Link to={{ pathname: "/users" }}>
              <Button className="m-2 mt-0 mb-4">Manage Users</Button>
            </Link>
          </Row>
        ) : (
          <div />
        )}
        <br />
      </div>
    );
  }
}
