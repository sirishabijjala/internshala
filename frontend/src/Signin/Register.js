import './Login.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; 
export default function Signup(){

  const [Signup, setSignup] = useState([]);
  const [newSignup, setNewSignup] = useState({
    name: '',
    phone: '',
    email:'',
    p:'',
    cp:'',
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchSignup();
  }, []);

  const fetchSignup = () => {
    fetch('http://localhost:5000/api/signup')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched signup:', data);
        setSignup(data);
      })
      .catch((error) => console.error('Error fetching signup:', error));
  };

  const handleAddSignup = async () => {
    var name = newSignup.name;
    var phone = newSignup.phone;
    var email = newSignup.email;
    var password = newSignup.p;
    var confirmPassword = newSignup.cp;

    var errorMessage = "";

    if (name.trim() === "") {
        errorMessage += "Name is required.\n";
    }

    if (phone.trim() === "") {
        errorMessage += "Phone number is required.\n";
    }

    // Regular expression for email validation
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.match(emailPattern)) {
        errorMessage += "Invalid email format.\n";
    }

    if (password.trim().length < 8) {
      errorMessage += "Password must be at least 8 characters long.\n";
  }
  

    if (password !== confirmPassword) {
        errorMessage += "Passwords do not match.\n";
    }

    if (errorMessage !== "") {
        setErrorMessage(errorMessage);
        return; // Prevent further execution
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSignup),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Internal Server Error');
      }

      console.log('User signup successfully');
      fetchSignup(); // Refresh the signup list
      setNewSignup({
        name: '',
        phone: '',
        email:'',
        p:'',
        cp:'',
      });       // Clear the input fields
      setSuccessMessage(`You Registered Successfully ${newSignup.name} !.`); // Set the success message
      setErrorMessage(''); // Reset error message
    } catch (error) {
      console.error('Error:', error.message);
      setSuccessMessage(''); // Clear any existing success message
      setErrorMessage('Error: ' + error.message);
    }
  };


    return(
        <>
           <nav class="navbar navbar-expand-lg bg-body-tertiary">{/* Navbar */}
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
        <h3 className='su2'>Sign Up</h3>  <br/>
        <p className="hr-line"></p>

       
        <div className='contain1 su1'>
            <div className='content1'>
                <div class="right-side1">
                <form action="#">{/* Registration form */}
                    <div class="input-box1" style={{height: "33px"}}><i class="fa-solid fa-user" style={{color:"#de1f26"}}></i>
                    <input type="text" placeholder="Enter your name"   value={newSignup.name}
                    onChange={(e) => setNewSignup({ ...newSignup, name: e.target.value })}/>
                    </div><br></br>
                    <div class="input-box1" style={{height: "33px"}}><i class="fa-solid fa-phone" style={{color:"#de1f26"}}></i>
                    <input type="text" placeholder="Enter your mobile no"  value={newSignup.phone}
                    onChange={(e) => setNewSignup({ ...newSignup, phone: e.target.value })}/>
                    </div><br></br>
                    <div class="input-box1" style={{height: "33px"}}><i class="fa-solid fa-envelope" style={{color:"#de1f26"}}></i>
                    <input type="text" placeholder="Enter your email" value={newSignup.email}
                    onChange={(e) => setNewSignup({ ...newSignup, email: e.target.value })}/>
                    </div><br></br>
                    <div class="input-box1" style={{height: "33px"}}><i class="fa-solid fa-lock" style={{color:"#de1f26"}}></i>
                    <input type="password" placeholder="Enter your password"   value={newSignup.p}
                    onChange={(e) => setNewSignup({ ...newSignup, p: e.target.value })}/>
                    </div><br></br>
                    <div class="input-box1" style={{height: "33px"}}><i class="fa-solid fa-lock" style={{color:"#de1f26"}}></i>
                    <input type="password" placeholder="Re-enter your password" value={newSignup.cp}
                    onChange={(e) => setNewSignup({ ...newSignup, cp: e.target.value })}/>
                    </div><br></br>
                    <div class="form-check">{/* Terms and Conditions */}
    <input class="form-check-input" type="checkbox" id="termsCheck" />
    <label class="form-check-label" htmlFor="termsCheck">
      I agree to the <a href="/terms">terms and conditions</a>
    </label>
  </div><br></br>
                    <div class="button1">
                    <input type="button" className="btn btn-primary" value="Sign Up" onClick={handleAddSignup}/>
                    </div>
                    <br/><br/><br/>
                    {successMessage && (
                        <p style={{ color: 'green', fontSize: '20px', fontWeight: 'bold' }}>{successMessage} <i class="fa-solid fa-thumbs-up fa-xl" style={{color:'#151647'}}></i></p>
                    )}
                    {errorMessage && <p style={{ color: 'red' , fontWeight:'bold'}}>{errorMessage}</p>}
                </form><br></br>
                </div>
             </div>
             <p style={{padding:"2px 2px 1px 0px"}}>If you have an account <Link to='/Login'>SignIn</Link></p>
        </div>
       {/* Animated image */}
<motion.img
        src="https://www.allen.ac.in/ace2324/assets/images/register.png" // Replace 'path_to_your_animated_image.gif' with the actual path to your GIF
        style={{ height: '450px', width: '730px', float: 'right', margin: '-600px 100px 20px 0' }}
        initial={{ opacity: 0, x: 100 }} // Initial animation properties
        animate={{ opacity: 1, x: 0 }} // Animation properties when component mounts
        transition={{ duration: 0.5, delay: 0.2 }} // Animation duration and delay
      />

        <br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/>

    
</>
    )
}