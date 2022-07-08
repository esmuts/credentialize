import React from "react";
import { Link } from "react-router-dom";
import { Row, Button } from "react-bootstrap";

export default function SignUpSuccess(props) {
  return (
    <div>
      <Row className="m-4 mb-2">
        <h3>Success!</h3>
      </Row>
      <Row>
        <p>
          <em>Please continue to Login.</em>
        </p>
      </Row>
      <Link to={{ pathname: "/login" }}>
        <Button className="m-2 mb-4">Login</Button>
      </Link>
    </div>
  );
}
