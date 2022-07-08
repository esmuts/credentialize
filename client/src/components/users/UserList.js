import React, { useState, useEffect } from "react";
import "./UserList.css";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

// Component returns a list of Cool-Tech Users.
export default function UserList() {
  // State stores list of users
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  // Retrieves user list when component first loads.
  useEffect(() => {
    // SetTimeout halts other effects until the callback function has executed.
    const timer = setTimeout(() => {
      getUsers();
    }, 100);
    // Clearing timeout ensures callback stops executing in the background.
    return () => clearTimeout(timer);
  }, []);

  // Helper function requests user list from server.
  async function getUsers() {
    try {
      // Requests credentials from the server.
      const result = await axios.get("/users/find");
      setUsers(result.data);
      // Catches error if credential retrieval fails.
    } catch (err) {
      setError(err);
    }
  }

  // Returns error message if credentials could not be retrieved from server.
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
  } else if (!users) {
    return <p>Loading...</p>;

    // Renders component if credentials retrieved successfully.
  } else {
    // Creates a list of credentials from retrieved credential array.
    const userList = users.map((item, index) => (
      <Link
        key={item.name + item.password + index}
        to={{ pathname: `/users/update/${item._id}` }}
      >
        <li className="p-2">
          <small>
            <strong>{item.name}</strong>
          </small>
          <br />
        </li>
      </Link>
    ));

    return (
      <div>
        <Row className="m-4 mb-2">
          <h3>Cool-Tech Users</h3>
          <p>
            <em>Select a user to update their permissions.</em>
          </p>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={12} sm={9} md={6}>
            <ul className="userlist p-0">{userList}</ul>
          </Col>
          <Col></Col>
        </Row>

        <Link to={{ pathname: `/welcome` }}>
          <Button className="m-4">Cancel</Button>
        </Link>
      </div>
    );
  }
}
