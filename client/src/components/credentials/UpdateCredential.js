import React, { useState, useEffect } from "react";
import CredentialForm from "./CredentialForm.js";
import { Row, Col, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// Function renders an updatable credential form.
export default function UpdateCredential(props) {
  // Credential data stored in state.
  const [credential, setCredential] = useState(null);
  const [error, setError] = useState(null);

  // Gets id value from URl parameter
  const { id } = useParams();

  // Retrieves credential when component first loads.
  useEffect(() => {
    // SetTimeout halts other effects until the callback function has executed.
    const timer = setTimeout(() => {
      getCredential();
    }, 100);
    // Clearing timeout ensures callback stops executing in the background.
    return () => clearTimeout(timer);
  }, []);

  // Helper function sends request to get credential from server.
  async function getCredential() {
    try {
      const result = await axios.get(`/credentials/find/${id}`);
      // Sets state value to retrieved credential value.
      setCredential(result.data);
    } catch (err) {
      setError(err);
    }
  }

  // Returns error message if credential could not be retrieved from server.
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
  } else if (!credential) {
    return <p>Loading...</p>;

    // Renders component if credentials retrieved successfully.
  } else {
    return (
      <div>
        <Row className="m-4 mb-2">
          <h3>Update Credential</h3>
        </Row>
        <Row>
          <p>
            <em>Update the fields you would like to change.</em>
          </p>
        </Row>
        <Row>
          <Col lg={3}></Col>
          <Col>
            <CredentialForm
              credential={credential}
              handleCredentialSubmit={props.handleCredentialSubmit}
            />
          </Col>
          <Col lg={3}></Col>
        </Row>
      </div>
    );
  }
}
