import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormStyles.css"; // Import custom CSS for styling
import config from "./config";

const AddPatient = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("active"); // Default to "inactive"
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Check if the email already exists
      const existingPatientResponse = await fetch(
        `${config.apiUrl}/api/patient/email/${email}`
      );
      if (existingPatientResponse.ok) {
        const existingPatient = await existingPatientResponse.json();
        if (existingPatient) {
          setMessage("Email address is already used.");
          return;
        }
      }

      // If email doesn't exist, proceed to add the patient with status
      const response = await fetch(`${config.apiUrl}/api/patient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, location, status }), // Include status in the request body
      });
      if (response.ok) {
        setMessage("Patient added successfully");
      } else {
        setMessage("Failed to add patient");
      }
      setName("");
      setEmail("");
      setLocation("");
      setStatus("active"); // Reset to default after successful submission
    } catch (error) {
      console.error("Error adding patient:", error);
      setMessage("Error adding patient");
    }
  };

  return (
    <div className="form-container">
      <h2>Add Patient</h2>
      <form className="patient-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />

        {/* Radio buttons for Active/Inactive status */}
        <div className="status-selection">
          <label>
            <input
              type="radio"
              value="active"
              checked={status === "active"}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
            Active &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </label>
          <label>
            <input
              type="radio"
              value="inactive"
              checked={status === "inactive"}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
            Inactive
          </label>
        </div>

        <button className="submit-button" type="submit">
          Add Patient
        </button>
      </form>
      {message && (
        <div className="message-container">
          <p
            className={`message ${
              message.includes("Error") ? "error-message" : ""
            }`}
          >
            {message}
          </p>
          <button className="home-button" onClick={() => navigate("/")}>
            Go to Home
          </button>
        </div>
      )}
    </div>
  );
};

export default AddPatient;
