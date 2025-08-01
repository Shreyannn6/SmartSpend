import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#80835b" }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand text-white" to="/">
          {props.title1}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="nav nav-underline w-100">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/uses">
                Uses
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/start">
                Let's Start
              </Link>
            </li>
            {/* Push Sign-in to the right */}
            <li className="nav-item ms-auto">
              <Link className="nav-link text-white" to="/signin">
                Sign-in
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
