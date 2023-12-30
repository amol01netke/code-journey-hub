import "./UserDashboard.css";
import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserDashboard = () => {
  const { userId } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      const response = await fetch(`http://localhost:8000/api/${userId}`);

      const data = await response.json();

      //set data
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.email);
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <React.Fragment>
      <div className="user-dashboard">
        {`Details of ${userId} :`}
        {`Name : ${firstName} ${lastName}`}
        {`Email : ${email}`}
      </div>
    </React.Fragment>
  );
};

export default UserDashboard;
