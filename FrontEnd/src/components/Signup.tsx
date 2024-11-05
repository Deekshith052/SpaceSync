// src/components/Signup.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from './Modal'; // Import the Modal component
import './Signup.css';

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    user_id: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    department: '',
    role: 'employee' // Default to employee
  });
  const [error, setError] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-z]+$/; // Only letters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // Password rules
    const phoneRegex = /^\d{10}$/;

    // Validate first name and last name
    if (!nameRegex.test(formData.first_name)) {
      setError("First name can only contain alphabets.");
      return false;
    }
    if (!nameRegex.test(formData.last_name)) {
      setError("Last name can only contain alphabets.");
      return false;
    }

    if (!phoneRegex.test(formData.phone_number)) {
      setError("Phone number must be exactly 10 digits.");
      return false;
    }
    // Validate password
    if (!passwordRegex.test(formData.password)) {
      setError("Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    setError(null);
    return true; // All validations passed
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // If validation fails, do not proceed
    }

    try {
      await axios.post('http://localhost:4000/api/v1/auth/register', formData);
      setModalVisible(true); // Show the modal

      // Automatically close the modal after 3 seconds
      setTimeout(() => {
        setModalVisible(false); // Hide the modal
        navigate('/login'); // Redirect to login page
      }, 2000);

    } catch (err: any) {
      console.error('Error:', err);
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="userId">User ID</label>
              <input
                type="text"
                id="userId"
                name="user_id"
                className="form-input"
                value={formData.user_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="first_name"
                className="form-input"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="last_name"
                className="form-input"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email ID</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone_number"
                className="form-input"
                value={formData.phone_number}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="department">Department Name</label>
              <input
                type="text"
                id="department"
                name="department"
                className="form-input"
                value={formData.department}
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="role">Role</label>
              <select
                id="role"
                name="role"
                className="form-input"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="employee">Employee</option>
                <option value="security">Security</option>
              </select>
            </div> */}
            <div className="form-group">
              <label htmlFor="password">Set Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-input"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        
        {error && <div className="error-message">{error}</div>}
        {modalVisible && <Modal message="Registration successful, Please login to continue" onClose={() => setModalVisible(false)} />}
        
        <div className="login-link">
          <p>Already have an account? <a href="/login">Login</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
