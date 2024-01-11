import "./Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      CJH &copy; All Rights Reserved
      <p>
        <Link to="/about-us">About Us</Link>
      </p>
    </footer>
  );
};

export default Footer;
