import React, { useState } from 'react';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [resetSuccessful, setResetSuccessful] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.trim() === '' || confirmPassword.trim() === '') {
      setMessage('Please enter your new password.');
      return;
    }
    if (password !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      // Simulate password reset logic
      // For demonstration purposes, set resetSuccessful to true after a delay
      setTimeout(() => {
        setResetSuccessful(true);
      }, 1500);
    } catch (error) {
      console.error('Error resetting password:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setMessage('');
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setMessage('');
  };

  return (<>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">FSD</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/Home">Home</a>
          </li>
        <li class="nav-item">
            <a class="nav-link" href="/Login" aria-disabled="true"><b>logout</b></a>
          </li>
        </ul>
        <form class="d-flex" role="search">
          
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button class="btn btn-outline-success" type="submit">Search</button>
         
        </form>
      
      </div>
    </div>
  </nav>
    <div>
      <h3>Reset Password</h3>
      {!resetSuccessful && (
        <form onSubmit={handleSubmit}>
          <div className='i'>
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter your new password"
              style={{ height: "35px", width: "420px" }}
            />
          </div><br></br>
          <div className='i'>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              placeholder="Confirm your new password"
              style={{ height: "35px", width: "420px" }}
            />
          </div><br></br><br></br>
          <button type="submit" className='i1'>Reset Password</button>
        </form>
      )}
      {resetSuccessful && (
        <div className='i'>
          <p>Password successfully reset.</p>
          <p>Proceed to <a href="/login">Login</a> page.</p>
        </div>
      )}
      {message && <p>{message}</p>}
    </div></>
  );
};

export default ResetPassword;
