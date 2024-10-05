import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css'; // Import custom CSS for styling
import config from './config';

const DeletePatient = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleDelete = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.apiUrl}/api/patient/email/${email}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setMessage('Patient deleted successfully');
      } else {
        setMessage('Failed to delete patient');
      }
      setEmail('');
    } catch (error) {
      console.error('Error deleting patient:', error);
      setMessage('Error deleting patient');
    }
  };

  return (
    <div className="form-container">
      <h2>Delete Patient</h2>
      <form className="patient-form" onSubmit={handleDelete}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <button className="submit-button" type="submit">Delete Patient</button>
      </form>
      {message && (
        <div className="message-container">
          <p className={`message ${message.includes('Error') ? 'error-message' : ''}`}>
            {message}
          </p>
          <button className="home-button" onClick={() => navigate('/')}>Go to Home</button>
        </div>
      )}
    </div>
  );
};

export default DeletePatient;
