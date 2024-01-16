import "./Header.css";
import cjh_logo from "../../assets/cjh_logo.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    console.log("Profile icon clicked!");
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    props.setIsLoggedIn(false);
  };

  const displayProfileMenu = () => (
    <ul className={`header-profile-menu ${isMenuOpen ? "show" : ""}`}>
      <Link
        to="/edit-account"
        className="header-menu-link"
        onClick={handleMenuItemClick}
      >
        <li>Edit My Account</li>
      </Link>
      <li onClick={handleLogout} className="logout-btn">
        Logout
      </li>
    </ul>
  );

  return props.isLoggedIn ? (
    <header className="header">
      {displayProfileMenu()}
      <div className="header-logo">
        <Link to="/user-dashboard">
          <img src={cjh_logo} className="header-icon" alt="header-logo" />
        </Link>
        <h1>CodeJourneyHub</h1>
      </div>

      <ul className="header-menu">
        <Link to="/dashboard" className="header-menu-link">
          <li>Home</li>
        </Link>
        <button className="profile-icon" onClick={handleMenuToggle}>
          <FontAwesomeIcon icon={faUser} />
        </button>
      </ul>
    </header>
  ) : (
    <header className="header">
      <div className="header-logo">
        <Link to="/user-dashboard">
          <img src={cjh_logo} className="header-icon" alt="header-logo" />
        </Link>
        <h1>CodeJourneyHub</h1>
      </div>
    </header>
  );
};

export default Header;
