// src/components/UserNavbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './UserNavbar.css'; // Custom CSS file for dropdown

const UserNavbar: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Navigate to the profile page
  const navigateToProfile = () => {
    navigate('/profile');
  };

  // Logout and redirect to the landing page
  const logout = () => {
    navigate('/');
  };

  return (
    <div className="user-navbar">
      <div className="navbar-container">
        <h1>SpaceSync</h1>
        <div className="nav-links">
          <Link to="/user">Book a Slot</Link>
          <Link to="/track-reservation">Track Reservation</Link>
          <Link to="/feedback">Feedback</Link>
        </div>

        {/* Profile Icon and Dropdown */}
        <div className="profile-container">
          <button
            className="profile-button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            👤 {/* Profile Icon */}
          </button>

          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={navigateToProfile} className="dropdown-item">
                Profile
              </button>
              <button onClick={logout} className="dropdown-item">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserNavbar;
