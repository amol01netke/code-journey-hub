import "./Header.css";
import cjh_logo from "../../assets/cjh_logo.png";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Header = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const burgerIcon = document.querySelector(".burger-menu");

    const handleMenuToggle = () => {
      setIsMenuOpen((prev) => !prev);
    };

    burgerIcon.addEventListener("click", handleMenuToggle);

    return () => burgerIcon.removeEventListener("click", handleMenuToggle);
  }, []);

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    props.setIsLoggedIn(false);
  };

  return (
    <header className="header">
      <div className="header-logo">
        <Link to="/user-dashboard">
          <img src={cjh_logo} className="header-icon" alt="header-logo" />
        </Link>
        <h1>CodeJourneyHub</h1>
      </div>
      <ul className={`menu ${isMenuOpen ? "show" : ""}`}>
        <li onClick={handleMenuItemClick}>
          <Link to="/user-dashboard">Home</Link>
        </li>
        <li onClick={handleMenuItemClick}>
          <Link to="/add-profile">Add Profile</Link>
        </li>
        <li onClick={handleMenuItemClick}>
          <Link to="/edit-profile">Edit Profile</Link>
        </li>
        <li onClick={handleLogout} className="logout-btn">
          Logout
        </li>
      </ul>
      <div className="burger-menu">&#9776;</div>
    </header>
  );
};

export default Header;
