import React, { useState } from "react";
import CredentialForm from "./CredentialForm.js";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function AddCredential(props) {
  return (
    <div>
      <Row className="m-4 mb-2">
        <h3>Add a new credential</h3>
      </Row>
      <Row>
        <Col md={3}></Col>
        <Col>
          <CredentialForm
            handleCredentialSubmit={props.handleCredentialSubmit}
          />
        </Col>
        <Col md={3}></Col>
      </Row>
    </div>
  );
}
