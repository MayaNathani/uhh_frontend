import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css'; // Import custom CSS for styling
import config from './config';

const UpdatePatientEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiUrl}/api/patient/email/${email}`);
      if (response.ok) {
        navigate(`/update/${email}`);
      } else {
        setError('Email not found. Please enter a valid email.');
      }
    } catch (error) {
      console.error('Error searching for patient:', error);
      setError('Failed to search for patient. Please try again later.');
    }
  };

  return (
    <div className="form-container">
      <h2>Update Patient</h2>
      <form className="patient-form" onSubmit={handleSearch}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Patient Email"
          required
        />
        <button className="submit-button" type="submit">Search</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default UpdatePatientEmail;
