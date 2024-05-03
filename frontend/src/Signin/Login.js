import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Link, Navigate } from 'react-router-dom'; // Import Navigate

import { motion } from 'framer-motion'; 
export default function Signin() {


  window.history.pushState(null, null, window.location.href);
  window.onpopstate = function() {
      window.history.go(1);
  };

  function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    p: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginDetails.email,
          p: loginDetails.p,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Internal Server Error');
      }

      console.log('Login successful');
      window.location.href = `/Home?email=${loginDetails.email}`;
      
      // Set the state to redirect
    } catch (error) {
      console.error('Error logging in:', error.message);
      setErrorMessage('Invalid email or password');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log(credentialResponse);
    console.log('Google login successful');
    // Navigate to home page or perform any other action upon successful Google login
    setRedirectToHome(true);
    setIsLoggedIn(true);
  };

  const handleGoogleLoginFailure = () => {
    console.log('Google login failed');
  };
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
    
      <nav class="navbar navbar-expand-lg bg-body-tertiary"> {/* navbar */}
  <div class="container-fluid">
    <a class="navbar-brand" href="#">FSD</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="/Home"><b>Home</b></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Login"><b>Signin</b></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Register"><b>Signup</b></a>
        </li>
        
        
      </ul>
      <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
      <h3 className='su2'>Sign In</h3>  <br/>
      <p className="hr-line"></p>

      <div className='contain1 su1' style={{ margin: '50px 20px 300px 150px' }}>
        <div className='content1'>
          <div className="right-side1">
            <form onSubmit={handleLogin}>{/* Form */}
              {errorMessage && <p style={{ color: 'red',fontWeight:'bold' }}>{errorMessage}<br/></p>}
              <div className="input-group input-box1" style={{ width: "220px" }}>
               <span className="input-group-text" style={{ backgroundColor: "#fff", border: "none" }}>
                
                </span>
                <input type="text"  className="form-control" placeholder="Enter email" name="email" value={loginDetails.email} onChange={handleInputChange} />
              </div><br></br>
  <div className="input-group input-box1" style={{ width: "220px" }}>
  <span className="input-group-text" style={{ backgroundColor: "#fff", border: "none" }}>
    <i className="fa-solid fa-lock" style={{ color: "#de1f26" }}></i>
  </span>
  <input 
    type={showPassword ? "text" : "password"} // Toggle password visibility
    className="form-control" 
    placeholder="Enter password" 
    name="p" 
    value={loginDetails.p} 
    onChange={handleInputChange} 
    aria-describedby="togglePassword"
  />
  <button 
    className="btn btn-outline-secondary" 
    type="button" 
    id="togglePassword" 
    onClick={togglePasswordVisibility}
  >
    {showPassword ? "Hide" : "Show"} {/* Toggle button text */}
  </button>
</div>
<br></br>
<div className="button-container">
  <div className="button1">
    <input type="submit" className="btn btn-primary"  value="Sign in"/>
  </div>
  <div className="button1">
    <input type="reset" className="btn btn-primary" onClick={() => setLoginDetails({ email: '', p: '' })} />
  </div>
</div>

       <br /><br />
            </form>
          </div>
        </div>
        
        <p style={{ padding: "10px 10px 10px 70px" }}><Link to='/Forgetpass'>forget password? </Link></p>
        <p style={{ padding: "10px 10px 10px 4px" }}>If you don't have an account <Link to='/Register'>SignUp</Link></p>
      </div>
      <div style={{ margin:'-300px 10px 10px 110px' }}> <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
        <div style={{ borderBottom: '3px solid #ccc', marginRight: '5px', width: '150px', height: '1px' }}></div>
        <div style={{ color: '#888', fontSize: '20px',fontWeight:'bold' }}>Or</div>
        <div style={{ borderBottom: '3px solid #ccc', marginLeft: '5px', width: '150px', height: '1px' }}></div>
      </div>
      {/* Google login button */}
      {/* implemented two-step verification */}
      <div style={{margin:' 10px 5px 5px 70px'}}>
      {isLoggedIn ? (
          <Navigate to="/Ghome" replace /> // Redirect to home page if logged in
          ) : (
        <GoogleOAuthProvider clientId='267560486974-kqi9btdejn8qtqvt8j1u710doctvlltf.apps.googleusercontent.com'>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
          />
        </GoogleOAuthProvider>
      )}
    </div></div><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

{/* Animated image */}
<motion.img
        src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg" // Replace 'path_to_your_animated_image.gif' with the actual path to your GIF
        style={{ height: '450px', width: '730px', float: 'right', margin: '-600px 100px 20px 0' }}
        initial={{ opacity: 0, x: 100 }} // Initial animation properties
        animate={{ opacity: 1, x: 0 }} // Animation properties when component mounts
        transition={{ duration: 0.5, delay: 0.2 }} // Animation duration and delay
      />
      

    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>

        <section class="footer">{/* Footer */}
          <div class="footer-row">
            <div class="footer-col">
              </div>
          </div>
        </section>
    </>
  );
}
