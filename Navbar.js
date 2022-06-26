import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  const linkStyles = {
    textDecoration: "none",
  };
  return (
    <div className="nav--container">
      <div className="navlinks">
        <ul>
          <Link style={linkStyles} to="/">
            <h4> General </h4>
          </Link>
          <Link style={linkStyles} to="/users">
            <li> User Profile </li>
          </Link>
          <Link style={linkStyles} to="/adding">
            <li> Adding of Violators </li>
          </Link>
          <Link style={linkStyles} to="/records">
            <li> Records Section</li>
          </Link>
          <Link style={linkStyles} to="/addOrdinances">
            <li>Add Ordinance</li>
          </Link>
          <Link style={linkStyles} to="/ordinances">
            <li>Ordinance</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
