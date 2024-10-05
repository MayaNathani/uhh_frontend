import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginStyles.css'; // Import custom CSS for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy credentials for authentication
    const validUsername = 'mukesh';
    const validPassword = 'nathani@uhh';

    if (username === validUsername && password === validPassword) {
      // Store the login status in local storage
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/'); // Navigate to home page after successful login
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-container">
            <input
              type="text"
              className="login-input"
              placeholder=" "
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label className="input-label">Username</label>
          </div>
          <div className="input-container">
            <input
              type="password"
              className="login-input"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label className="input-label">Password</label>
          </div>
          <button className="login-button" type="submit">Login</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
