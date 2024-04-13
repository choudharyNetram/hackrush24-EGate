import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login page if not authenticated
      navigate('/loginstudent');
    } 
  }, [navigate]);
  

  return (
    <div>
        <Link to={`/studentprofile`} > Profile page</Link>
        this is homepage 
    </div>

  );
};


export default HomePage;