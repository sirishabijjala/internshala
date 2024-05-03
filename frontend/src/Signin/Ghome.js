import React from 'react';

import './Login.css';
const Ghome = () => {
 
  

  return (
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
<div class="container-lg">
 <main>
       <div class="v">
                    <img src="https://www.velocityconsultancy.com/wp-content/uploads/2021/09/website.jpg" width="100%" height="300%"></img>
                   
                </div>
             
            
        </main>
        <footer class="text-center mt-4">
            <p>&copy; 2024 . All rights reserved.</p>
        </footer>
   
</div>
    </>
  );
};

export default Ghome;
