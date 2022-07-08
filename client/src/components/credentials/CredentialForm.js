import React, { useState, useEffect } from "react";
import "./CredentialForm.css";
import { Row, Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

export default function CredentialForm(props) {
  // Gets unit and division data from URL parameters.
  const { unit } = useParams();
  const { division } = useParams();
  // Gets id from current URL (only has value for update requests).
  const { id } = useParams();

  // Sets a state object for rendering signup form values and passing a signup
  // object to the parent component on submission.
  const [credential, setCredential] = useState({
    id: "",
    location: "",
    login: "",
    password: "",
    unit: unit,
    division: division,
  });

  // Uses props to set state of credential object if it is an update request
  // (i.e. if credential props have been passed.)
  useEffect(() => {
    if (props.credential) {
      setCredential(props.credential);
    }
  }, []);

  // Sets temp variable for handling new form values and passing them to state
  // object modifier ('setCredential').
  let updatedValue = {};

  // Method handles form changes by updating state object values.
  const handleChange = (event) => {
    // Catches current form value update by reference to form name and value.
    updatedValue = { [event.target.name]: event.target.value };
    // Updates state based on current form input value.
    setCredential((credential) => ({
      ...credential,
      ...updatedValue,
    }));
  };

  // Method handles form submission by passing values to callback function in
  // the parent component.
  const handleSubmit = (event) => {
    event.preventDefault();
    props.handleCredentialSubmit(credential);
  };

  return (
    <form className="credential-form m-4 mt-0" onSubmit={handleSubmit}>
      <Row>
        <label>
          Location:
          <input
            className="mt-2 p-1"
            type="text"
            name="location"
            value={credential.location}
            placeholder="Enter location (e.g. www.mongodb.com)"
            onChange={handleChange}
            required
          />
        </label>
      </Row>
      <br />
      <Row>
        <label>
          Login:
          <input
            className="mt-2 p-1"
            type="text"
            name="login"
            value={credential.login}
            placeholder="Enter login (e.g. news-marketing-mongo)"
            onChange={handleChange}
            required
          />
        </label>
      </Row>
      <br />
      <Row>
        <label>
          Password:
          <input
            className="mt-2 p-1"
            type="text"
            name="password"
            value={credential.password}
            placeholder="Enter password (e.g. monkeybootplasma)"
            onChange={handleChange}
            required
          />
        </label>
      </Row>
      <br />
      <div className="credential-submit">
        <Button type="submit" className="m-4">
          Submit
        </Button>
        <Link to={{ pathname: `/credentials/${unit}/${division}` }}>
          <Button className="m-4">Go Back</Button>
        </Link>
      </div>
    </form>
  );
}
