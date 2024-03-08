import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faArrowRight, faBars } from '@fortawesome/free-solid-svg-icons';

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const logOut = () => {
    // Your logout logic goes here
    console.log("User logged out");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Job Portal
        </Link>
        <div className={`menu-icon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-links">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Jobs
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-links">
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link to="" className="nav-links" onClick={logOut}>
              <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-links">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
