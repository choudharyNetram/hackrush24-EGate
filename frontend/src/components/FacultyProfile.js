import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FacultyProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await axios.get('http://localhost:5000/profile/Faculty', {
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
      <h2>Faculty Profile</h2>
      {error && <p>Error: {error}</p>}
      {profile && (
        <div>
          <p>User Email: {profile.useremail}</p>
          <p>Housing Number: {profile.housingNumber}</p>
          <p>Flat Number: {profile.flatNumber}</p>
          <p>Phone Number: {profile.phoneNumber}</p>
          <p>Discipline: {profile.discipline}</p>
          <p>Permanent Address: {profile.permanentAddress}</p>
          <p>Is On Campus: {profile.isOnCampus ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default FacultyProfile;
