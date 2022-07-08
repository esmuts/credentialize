import React from "react";
import "./Header.css";
import logo from "../../assets/key-solid.svg";
import { Link } from "react-router-dom";

// This component renders the app header.
export default function Header(props) {
  // Page header links to 'Home' or 'Welcome' page, depending on the status of
  // the token props.
  return (
    <div>
      {props.token ? (
        <Link to={"/welcome"}>
          <h1>
            <img className="logo m-3" src={logo} alt="key logo"></img>
            Credentialize
          </h1>
        </Link>
      ) : (
        <Link to={"/"}>
          <h1>
            <img className="logo m-3" src={logo} alt="key logo"></img>
            Credentialize
          </h1>
        </Link>
      )}
      <p className="motto mt-2">
        <big>
          <em>All your credentials at your fingertips.</em>
        </big>
      </p>
    </div>
  );
}
