import "./EditAccount.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";

const EditAccount = (props) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/get-user-profile",
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

          setFormData({
            firstName: data.firstName,
            lastName: data.lastName,
          });
        } else {
          const error = await response.json();
          console.log(error);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserProfile();
  }, [props.token]);

  const enableInput = (e, id) => {
    e.preventDefault();

    const input = document.querySelector(`[data-input="${id}"]`);

    if (input) {
      input.disabled = !input.disabled;
    }
  };

  const updateAccount = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8000/api/update-user-profile`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${props.token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        const error = await response.json();
        console.log(error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="edit-account">
      <form className="edit-account-form" onSubmit={(e) => updateAccount(e)}>
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
