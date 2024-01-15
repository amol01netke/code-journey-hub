import "./AboutUs.css";
import cjh_logo from "../../assets/cjh_logo_black.svg";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-us-header">
        <img src={cjh_logo} alt="cjh_logo" /> <h1>About Us</h1>
      </div>
      <section className="welcome-section">
        <p>
          <b>
            Welcome to CodeJourneyHub - a centralized dashboard for Competitive
            Programmers
          </b>
          <br />
          <br />
          At CodeJourneyHub, we understand the dynamic world of competitive
          programming and the need for a comprehensive solution to streamline
          your coding journey. Our platform is engineered to simplify the
          management of coding challenges and progress. With CodeJourneyHub, you
          can bid farewell to the hassle of juggling between multiple platforms.
          Focus on what you do best – coding – while we take care of the
          organization. The centralized dashboard brings together all your
          coding activities, making it easier than ever to navigate through your
          coding journey.
        </p>
      </section>

      <section className="join-section">
        <p>
          Join us at CodeJourneyHub and embark on a coding adventure like never
          before.
          <br />
          <Link to="/authentication">Get Started</Link>
          <br />
          <br />
          Happy Coding!
          <br />
          The CodeJourneyHub Team
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
