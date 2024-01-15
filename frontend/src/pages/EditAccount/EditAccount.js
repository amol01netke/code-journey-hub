import "./EditAccount.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const EditAccount = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const userToken = props.token;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "https://code-journey-hub.onrender.com/api/get-user-profile",
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          setFormData({
            firstName: data.firstName,
            lastName: data.lastName,
          });

          setIsLoading(false);
        } else {
          const error = await response.json();
          console.log(error);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserProfile();
  }, [userToken]);

  const enableInput = (e, id) => {
    e.preventDefault();

    const input = document.querySelector(`[data-input="${id}"]`);

    if (input) {
      input.value = "";
      input.disabled = !input.disabled;
    }
  };

  const updateAccount = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://code-journey-hub.onrender.com/api/update-user-profile`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return isLoading ? (
    <React.Fragment>
      <div className="user-dashboard">
        <p className="loading-msg">Loading...</p>
      </div>
    </React.Fragment>
  ) : (
    <div className="edit-account">
      <form className="edit-account-form" onSubmit={updateAccount}>
        <h2>Edit Account</h2>
        <div className="input-card">
          <label className="form-label">First Name </label>
          <input
            type="text"
            placeholder={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
            className="edit-form-input"
            disabled
            data-input="1"
          />
          <button className="edit-btn" onClick={(e) => enableInput(e, 1)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>
        <div className="input-card">
          <label className="form-label">Last Name </label>
          <input
            type="text"
            placeholder={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
            className="edit-form-input"
            disabled
            data-input="2"
          />
          <button className="edit-btn" onClick={(e) => enableInput(e, 2)}>
            <FontAwesomeIcon icon={faEdit} />
          </button>
        </div>

        <div className="input-card">
          <input
            type="submit"
            className="edit-form-submit"
            value="Save Changes"
          />
        </div>
      </form>
    </div>
  );
};

export default EditAccount;
