import React from "react";
// Import React Bootstrap components.
import { Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function RegistrationSuccess() {
  return (
    <div>
      <Row className="m-4 mb-2">
        <h3>Successful Registration</h3>
        <p>Please click on the 'Login' button below to continue.</p>
      </Row>
      <Row>
        <Link to={{ pathname: "/login" }}>
          <Button className="m-2 mb-4" type="submit">
            Login
          </Button>
        </Link>
      </Row>
    </div>
  );
}
