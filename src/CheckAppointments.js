import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormStyles.css'; // Import custom CSS for styling
import config from './config';

const CheckAppointments = () => {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleCheckAppointments = async () => {
    try {
      const response = await fetch(`${config.apiUrl}/api/patient/check-appointments`, {
        method: 'GET',
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'overdue_appointments.xlsx'; // or .docx
        document.body.appendChild(a);
        a.click();
        a.remove();
        setMessage('Overdue appointments file generated successfully.');
      } else {
        setMessage('Failed to check appointments.');
      }
    } catch (error) {
      console.error('Error checking appointments:', error);
      setMessage('Error checking appointments.');
    }
  };

  return (
    <div className="form-container">
        <h2>Check Patient Appointment</h2>
        <form className="patient-form">
            <button type="button" onClick={handleCheckAppointments}>Check Appointments</button>
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

/*    <div>
      <h2>Check Appointments</h2>
      <button onClick={handleCheckAppointments}>Check Appointments</button>
      {message && <p>{message}</p>}
      <button className="home-button" onClick={() => navigate('/')}>Go to Home</button>
    </div>*/
  );
};

export default CheckAppointments;
