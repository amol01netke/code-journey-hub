import "./PublicProfile.css";
import React, { useParams, useState, useEffect } from "react";
import codechef_logo from "../../assets/codechef_logo.jpg";
import leetcode_logo from "../../assets/leetcode_logo.png";

const PublicProfile = () => {
  const { username } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");

  const [codechefData, setCodechefData] = useState({
    username: "",
    rank: "",
    stars: "",
    currentRating: "",
    highestRating: "",
  });

  const [leetcodeData, setLeetcodeData] = useState({
    username: "",
    rank: "",
    points: "",
    acceptanceRate: "",
    totalSolved: "",
    totalQuestions: "",
  });

  useEffect(() => {
    const fetchPublicProfile = async () => {
      try {
        const response = await fetch(
          `https://code-journey-hub.onrender.com/api/get-public-profile?username=${username}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);

          setName(`${data.firstName} ${data.lastName}`);

          if (data.codechef) {
            setCodechefData({
              username: data.codechef.username,
              rank: data.codechef.globalRank,
              stars: data.codechef.stars,
              currentRating: data.codechef.currentRating,
              highestRating: data.codechef.highestRating,
            });
          }

          if (data.leetcode) {
            setLeetcodeData({
              username: data.leetcode.username,
              rank: data.leetcode.ranking,
              points: data.leetcode.contributionPoints,
              acceptanceRate: data.leetcode.acceptanceRate,
              totalSolved: data.leetcode.totalSolved,
              totalQuestions: data.leetcode.totalQuestions,
            });
          }

          setIsLoading(false);
        } else {
          const error = await response.json();
          console.log(error);
          alert(error.error);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchPublicProfile();
  }, [username]);

  return isLoading ? (
    <React.Fragment>
      <div className="user-dashboard">
        <p className="loading-msg">Loading...</p>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className="public-profile">
        <h1>Welcome to {`${name}'s Profile`}</h1>
        <div className="profile-cards">
          <div className="profile-card codechef-card">
            <div className="profile-card-header">
              <img src={codechef_logo} alt="codechef_logo" />
              <h2>Codechef Profile</h2>
            </div>
            <div className="profile-card-info">
              {codechefData.username ? (
                <div>
                  <p>{`Username : ${codechefData.username}`}</p>
                  <p>{`Rank : ${codechefData.rank}`}</p>
                  <p>{`Stars : ${codechefData.stars}`}</p>
                  <p>{`Current Rating : ${codechefData.currentRating}`}</p>
                  <p>{`Highest Rating : ${codechefData.highestRating}`}</p>
                  <div className="links">
                    <a
                      href={`https://codechef.com/${codechefData.username}`}
                      target="blank"
                    >
                      Visit Profile
                    </a>
                  </div>
                </div>
              ) : (
                <div className="no-profile">
                  <p>Profile not added</p>
                </div>
              )}
            </div>
          </div>
          <div className="profile-card leetcode-card">
            <div className="profile-card-header">
              <img
                src={leetcode_logo}
                alt="leetcode_logo"
                className="leetcode-logo"
              />
              <h2>Leetcode Profile</h2>
            </div>
            <div className="profile-card-info">
              {leetcodeData.username ? (
                <div>
                  <p>{`Username : ${leetcodeData.username}`}</p>
                  <p>{`Rank : ${leetcodeData.rank}`}</p>
                  <p>{`Points : ${leetcodeData.points}`}</p>
                  <p>{`Acceptance Rate : ${leetcodeData.acceptanceRate} `}</p>
                  <p>{`Solved : ${leetcodeData.totalSolved}/${leetcodeData.totalQuestions}`}</p>
                  <div className="links">
                    <a
                      href={`https://leetcode.com/${leetcodeData.username}`}
                      target="blank"
                    >
                      Visit Profile
                    </a>
                  </div>
                </div>
              ) : (
                <div className="no-profile">
                  <p>Profile not added</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PublicProfile;
