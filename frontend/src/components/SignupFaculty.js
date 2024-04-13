import React, { useState } from 'react';
import axios from 'axios';

const FacultySignUpForm = () => {
  const [formData, setFormData] = useState({
    useremail: '',
    password: '',
    housingNumber: '',
    flatNumber: '',
    phoneNumber: '',
    discipline: '',
    permanentAddress: '',
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
      const response = await axios.post('http://localhost:5000/signup/Faculty', formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Faculty Sign Up</h2>
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
          <label>Housing Number:</label>
          <input type="text" name="housingNumber" value={formData.housingNumber} onChange={handleChange} />
        </div>
        <div>
          <label>Flat Number:</label>
          <input type="text" name="flatNumber" value={formData.flatNumber} onChange={handleChange} />
        </div>
        <div>
          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
        </div>
        <div>
          <label>Discipline:</label>
          <input type="text" name="discipline" value={formData.discipline} onChange={handleChange} />
        </div>
        <div>
          <label>Permanent Address:</label>
          <input type="text" name="permanentAddress" value={formData.permanentAddress} onChange={handleChange} />
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

export default FacultySignUpForm;
