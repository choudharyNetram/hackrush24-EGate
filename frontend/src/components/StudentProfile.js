import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:5000/profile/Student', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        // Check if the request was successful (status code 200)
        if (response.status === 200) {
          setProfile(response.data);
        } else {
          throw new Error(`Failed to fetch profile data`);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Student Profile</h2>
      {error && <p>Error: {error}</p>}
      {profile && (
        <div>
        <p>User Email: {profile[0]}</p>
        <p>Hostel Name: {profile[1]}</p>
        <p>Room Number: {profile[2]}</p>
        <p>Phone Number: {profile[3]}</p>
        <p>Program: {profile[4]}</p>
        <p>Discipline: {profile[5]}</p>
        <p>Roll Number: {profile[6]}</p>
        <p>Address: {profile[7]}</p>
        <p>Is On Campus: {profile[8] ? 'Yes' : 'No'}</p>
        </div>

      )}
    </div>
  );
};

export default StudentProfile;
