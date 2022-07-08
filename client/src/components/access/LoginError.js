import React from "react";
import { Link } from "react-router-dom";
import { Row, Button } from "react-bootstrap";

export default function LoginError(props) {
  return (
    <div className="login">
      <Row className="m-4 mb-2">
        <h3>Oops!</h3>
      </Row>
      <Row>
        <p>
          <em>{props.error.response.data.msg}</em>
        </p>
      </Row>
      <Link to={{ pathname: "/login" }}>
        <Button>Try again</Button>
      </Link>
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
