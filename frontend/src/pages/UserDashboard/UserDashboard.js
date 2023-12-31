import React, { useState, useEffect } from "react";

const UserDashboard = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (!props.token) {
          console.error("No token available.");
          return;
        }

        const response = await fetch(
          "http://localhost:8000/api/users/user-details",
          {
            method: "GET",
            headers: {
              "content-Type": "application/json",
              Authorization: `Bearer ${props.token}`,
            },
          }
        );

        const data = await response.json();
        console.log(data);

        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchUserDetails();
  }, [props.token]);

  return (
    <React.Fragment>
      <div className="user-dashboard">
        {`Details :`}
        {`Name : ${firstName} ${lastName}`}
        {`Email : ${email}`}
      </div>
    </React.Fragment>
  );
};

export default UserDashboard;
