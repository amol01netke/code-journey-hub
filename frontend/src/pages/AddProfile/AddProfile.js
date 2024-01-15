import "./AddProfile.css";
import { useState } from "react";

const AddProfile = (props) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [username, setUsername] = useState("");

  const createProfile = async (e) => {
    e.preventDefault();

    if (!username || selectedOption === "default") {
      console.log("Please provide a valid username and select a platform.");
      alert("Please provide a valid username and select a platform.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/create-${selectedOption}-profile`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify({ username }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setUsername("");
        setSelectedOption("");

        alert(data.message);
      } else {
        const error = await response.json();
        console.log(error);
        alert(error.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="add-profile">
      <form className="add-profile-form" onSubmit={createProfile}>
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="select-platform"
        >
          <option value="default">Choose a platform</option>
          <option value="codechef">Codechef</option>
          <option value="leetcode">Leetcode</option>
        </select>
        <input
          type="text"
          className="input-username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={`Enter username`}
        />
        <input type="submit" className="create-btn" value="Create Profile" />
      </form>
    </div>
  );
};

export default AddProfile;
