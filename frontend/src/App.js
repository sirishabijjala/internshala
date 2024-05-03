import React from 'react';
import './App.css';
import Login from './Signin/Login';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Forgetpass from './Signin/Forgetpass';
import Register from './Signin/Register';
import Home from './Signin/Home';

import Reset from './Signin/Reset';
import Ghome from './Signin/Ghome';
import Terms from './Signin/Terms';
function App() {
  return (
  <Router>
 <Routes>
 <Route exact path='/Login' element={<Login />}></Route>
 <Route exact path='/' element={<Login />}></Route>
 <Route exact path='/Home' element={<Home />}></Route>
 <Route exact path='/Forgetpass' element={<Forgetpass />}></Route>
 <Route exact path='/Register' element={<Register />}></Route>
 
 <Route exact path='/Reset' element={<Reset />}></Route>
 <Route exact path='/Ghome' element={<Ghome />}></Route>
 <Route exact path='/Terms' element={<Terms />}></Route>
</Routes>
</Router>   
  );
};

export default App;
