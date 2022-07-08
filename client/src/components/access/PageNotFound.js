import React from "react";
import { Link } from "react-router-dom";
import { Row, Button } from "react-bootstrap";

export default function PageNotFound() {
  return (
    <div>
      <Row className="m-4 mb-2">
        <h3>404</h3>
      </Row>
      <Row>
        <p>
          <em>Nothing to see here.</em>
        </p>
      </Row>
      <Link to={{ pathname: "/" }}>
        <Button className="m-2 mb-4">Home</Button>
      </Link>
    </div>
  );
}
