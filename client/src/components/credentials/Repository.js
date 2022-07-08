import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";

// Component returns a of credential repository for a given division.
export default function Repository(props) {
  // State stores user role, for managing permissions.
  const [role, setRole] = useState(null);
  // State stores list of credentials
  const [credentials, setCredentials] = useState(null);
  const [error, setError] = useState(null);

  // Sets unit and division according to URL parameter values.
  const { unit } = useParams();
  const { division } = useParams();

  // Retrieves credential list when component first loads.
  useEffect(() => {
    // SetTimeout halts other effects until the callback function has executed.
    const timer = setTimeout(() => {
      getRole();
      getCredentials();
    }, 100);
    // Clearing timeout ensures callback stops executing in the background.
    return () => clearTimeout(timer);
  }, []);

  // Helper function validates token and gets user role from its payload.
  async function getRole() {
    try {
      // Requests token verification and payload from server.
      const decodedToken = await axios.get("/users/verify", {
        headers: { Authorization: `Bearer ${props.token}` },
      });
      // Uses retrieved token payload to set user state's values.
      setRole(decodedToken.data.decoded.role);
    } catch (err) {
      setError(err);
    }
  }

  // Helper function requests credential list from server.
  async function getCredentials() {
    try {
      // Requests credentials from the server.
      const result = await axios.get(`/credentials/find/${unit}/${division}`);
      setCredentials(result.data);
      // Catches error if either token validation or credential retrieval
      // fails.
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
  } else if (!credentials) {
    return <p>Loading...</p>;

    // Renders component if credentials retrieved successfully.
  } else {
    // Creates a list of credentials from retrieved credential array.
    const credList = credentials.map((item) => (
      <li key={item._id} className="p-2">
        <small>
          <strong>{item.location}</strong>
          <br />
          Login: <em>{item.login}</em>
          <br />
          Password: <em>{item.password}</em>
        </small>
        <br />
        {role === "normal" ? (
          <div />
        ) : (
          <Link
            to={{
              pathname: `/credentials/${unit}/${division}/update/${item._id}`,
            }}
          >
            <Button className="update-button m-2 mb-1" size="sm">
              Edit
            </Button>
          </Link>
        )}
      </li>
    ));

    // Renders the credential list
    return (
      <div>
        <Row className="m-4 mb-2">
          <h3>Login Repository</h3>
        </Row>
        <Row>
          <p>
            <em>
              {unit}: {division}
            </em>
          </p>
        </Row>
        <Row className="m-2 mb-4">
          <Col></Col>
          <Col className="p-0" xs={12} sm={9} md={6}>
            <ul className="cred-list p-0">{credList}</ul>
          </Col>
          <Col></Col>
        </Row>
        <Row className="m-2">
          <Link to={{ pathname: `/credentials/${unit}/${division}/add` }}>
            <Button>Add New Credential</Button>
          </Link>
        </Row>
        <Row>
          <Link to={{ pathname: "/welcome" }}>
            <Button className="m-2">Go Back</Button>
          </Link>
        </Row>
        <br />
      </div>
    );
  }
}
