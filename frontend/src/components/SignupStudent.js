import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    useremail: '',
    password: '',
    hostelName: '',
    RoomNumber: '',
    PhoneNumber: '',
    program: '',
    discipline: '',
    RollNumber: '',
    address: '',
    isOnCampus: false
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup/Student', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Student Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="useremail" value={formData.useremail} onChange={handleChange} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div>
          <label>Hostel Name:</label>
          <input type="text" name="hostelName" value={formData.hostelName} onChange={handleChange} />
        </div>
        <div>
          <label>Room Number:</label>
          <input type="text" name="RoomNumber" value={formData.RoomNumber} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="PhoneNumber" value={formData.PhoneNumber} onChange={handleChange} />
        </div>
        <div>
          <label>Program:</label>
          <input type="text" name="program" value={formData.program} onChange={handleChange} />
        </div>
        <div>
          <label>Discipline:</label>
          <input type="text" name="discipline" value={formData.discipline} onChange={handleChange} />
        </div>
        <div>
          <label>Roll Number:</label>
          <input type="text" name="RollNumber" value={formData.RollNumber} onChange={handleChange} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} />
        </div>
        <div>
          <label>On Campus:</label>
          <input type="checkbox" name="isOnCampus" checked={formData.isOnCampus} onChange={() => setFormData({...formData, isOnCampus: !formData.isOnCampus})} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SignUpForm;
