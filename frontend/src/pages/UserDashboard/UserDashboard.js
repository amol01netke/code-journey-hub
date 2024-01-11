import React, { useState, useEffect } from "react";
import "./UserDashboard.css";

const UserDashboard = (props) => {
  const [codechefData, setCodechefData] = useState({
    username: "",
    rank: "",
    stars: "",
  });

  const [leetcodeData, setLeetCodeData] = useState({
    username: "",
    rank: 0,
    points: 0,
  });

  useEffect(() => {
    const fetchUserProfiles = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/get-user-profiles",
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${props.token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          setCodechefData({
            username: data.codechef.username,
            rank: data.codechef.globalRank,
            stars: data.codechef.stars,
          });

          setLeetCodeData({
            username: data.leetcode.username,
            rank: data.leetcode.ranking,
            points: data.leetcode.contributionPoints,
          });
        } else {
          const error = await response.json();
          console.log(error);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserProfiles();
  }, [props.token]);

  return (
    <React.Fragment>
      <div className="user-dashboard">
        <div className="profile-cards">
          <div className="profile-card">
            <h3>Codechef</h3>
            <div className="profile-info">
              <p>{`Username : ${codechefData.username}`}</p>
              <p>{`Rank : ${codechefData.rank}`} </p>
              <p>{`Stars : ${codechefData.stars}`}</p>
            </div>
          </div>
          <div className="profile-card">
            <h3>Leetcode</h3>{" "}
            <div className="profile-info">
              <p>{`Username : ${leetcodeData.username}`}</p>
              <p>{`Rank : ${leetcodeData.rank}`} </p>
              <p>{`Points  : ${leetcodeData.points}`}</p>
            </div>
          </div>
        </div>
        <div className="link-generator">
          <button className="generate">Generate a link</button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserDashboard;
