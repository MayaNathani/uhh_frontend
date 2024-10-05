import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import "./FormStyles.css"; // Import custom CSS for styling
import config from "./config";

const UpdatePatient = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [name, setName] = useState("");
  const [lastAppointmentDate, setLastAppointmentDate] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("active");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(
          `${config.apiUrl}/api/patient/email/${email}`
        );
        if (response.ok) {
          const data = await response.json();
          setPatient(data);
          setName(data.name);
          setLastAppointmentDate(data.lastAppointmentDate);
          setLocation(data.location);
          setStatus(data.status);
        } else {
          console.error("Failed to fetch patient details");
        }
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
    fetchPatient();
  }, [email]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formattedDate = moment(lastAppointmentDate)
        .add(1, "day")
        .format("YYYY-MM-DD");

      const response = await fetch(
        `${config.apiUrl}/api/patient/email/${email}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            lastAppointmentDate: formattedDate,
            location,
            status,
          }),
        }
      );
      if (response.ok) {
        console.log("Patient updated successfully");
        navigate("/");
      } else {
        console.error("Failed to update patient");
      }
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  if (!patient) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="form-container">
      <h2>Update Patient</h2>
      <form className="patient-form" onSubmit={handleUpdate}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Last Appointment Date:
          <input
            type="date"
            value={lastAppointmentDate}
            onChange={(e) => setLastAppointmentDate(e.target.value)}
            required
          />
        </label>
        <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label>

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
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdatePatient;
