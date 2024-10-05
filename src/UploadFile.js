import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FormStyles.css"; // Import custom CSS for styling
import config from "./config";

const UploadFile = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`${config.apiUrl}/api/patient/upload`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("File uploaded successfully and processed.");
      } else {
        setMessage("Failed to upload the file.");
      }
      setFile(null); // Reset file after submission
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file.");
    }
  };

  return (
    <div className="form-container">
      <h2>Upload The Excel File</h2>
      <br></br>
      <h4>Please make sure the file should contains new Patient Details</h4>
      <br></br>
      <br></br>

      <form className="upload-form" onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          required
        />
        <br></br>
        <br></br>
        <button className="submit-button" type="submit">
          Upload File
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

export default UploadFile;
