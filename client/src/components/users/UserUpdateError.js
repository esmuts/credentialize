import React from "react";
import { Link } from "react-router-dom";
import { Row, Button } from "react-bootstrap";

export default function UserUpdateError() {
  return (
    <div>
      <Row className="m-4 mb-2">
        <h3>Sorry!</h3>
      </Row>
      <Row>
        <p>
          <em>Something went wrong when we tried to update the user.</em>
        </p>
      </Row>
      <Link to={{ pathname: "/users" }}>
        <Button className="m-2 mb-4">Home</Button>
      </Link>
    </div>
  );
}
