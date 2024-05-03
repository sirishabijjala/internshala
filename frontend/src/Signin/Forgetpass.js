import React, { useState } from 'react';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resetToken, setResetToken] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      setMessage('Please enter your email.');
      return;
    }
    // Simulate generating reset token
    setTimeout(() => {
      const token = generateResetToken(); // Replace this with your token generation logic
      setResetToken(token);
      setMessage('Password reset link generated. Check below.');
    }, 1500);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setMessage('');
    setResetToken(null);
  };

  const generateResetToken = () => {
    // Replace this with your token generation logic
    return Math.random().toString(36).substr(2);
  };

  const handleResetPassword = () => {
    // Implement your reset password logic here using the resetToken
    // For example, you can navigate to a reset password page with the token in the URL
    console.log('Reset password for email:', email);
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
      <h3>Forget Password?</h3>
      <form onSubmit={handleSubmit}>
        <div className='i'>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            style={{ height: "35px", width: "420px" }}
          />
        </div><br></br><br></br>
        <button type="submit" className='i1'>Reset Password</button>
      </form>
      {message && <p>{message}</p>}
      {resetToken && (
        <div className='i'>
          <p>Use the following link to reset your password:</p>
          <button onClick={handleResetPassword}>
          <a href="/Reset"> Reset Password Link:</a></button>
        </div>
      )}
    </div></>
  );
};

export default ForgetPassword;
