import React from "react";
import { Link } from "react-router-dom";
import { Row, Button } from "react-bootstrap";

// This component returns a home screen for the app.
export default function Home() {
  return (
    <div>
      <Row className="m-4">
        <h4>Welcome to the Cool-Tech Credential Manager.</h4>
        <p>
          <em>Please login to proceed.</em>
        </p>
      </Row>
      <Row>
        <Link to={{ pathname: "/login" }}>
          <Button>Login</Button>
        </Link>
      </Row>
      <br />
      <Row className="signup-prompt m-5 mb-3 p-3">
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
