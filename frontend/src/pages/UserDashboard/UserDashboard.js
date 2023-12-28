import "./UserDashboard.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import React from "react";
import { useParams } from "react-router-dom";

const UserDashboard = () => {
  const { userId } = useParams();

  return (
    <React.Fragment>
      <Header />
      {userId}
      <Footer />
    </React.Fragment>
  );
};

export default UserDashboard;
