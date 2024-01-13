import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      CJH &copy; All Rights Reserved
      <Link to="/about-us" className="footer-link">
        <p>About Us </p>
      </Link>
    </footer>
  );
};

export default Footer;
