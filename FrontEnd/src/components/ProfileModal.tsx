// src/components/ProfileModal.tsx
import React, { useState } from 'react';
import './ProfileModal.css'; // Custom styling for modal

const initialUserData = {
  user_id: '12345',
  first_name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
  phone_number: '+1 234 567 890',
  department: 'IT',
  role: 'employee',
};

interface ProfileModalProps {
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ onClose }) => {
  const [userData, setUserData] = useState(initialUserData);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="profile-modal-overlay">
      <div className="profile-modal">
        <button className="close-button" onClick={onClose}>X</button>

        <div className="profile-header">
          <img
            src="https://randomuser.me/api/portraits/men/10.jpg" // Random profile picture
            alt="Profile"
            className="profile-image"
          />
          <h2>{userData.first_name} {userData.last_name}</h2>
        </div>

        <div className="profile-content">
          <div className="form-group">
            <label>User ID</label>
            <input type="text" value={userData.user_id} readOnly />
          </div>

          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              value={userData.first_name}
              readOnly={!isEditing}
              onChange={(e) => setUserData({ ...userData, first_name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              value={userData.last_name}
              readOnly={!isEditing}
              onChange={(e) => setUserData({ ...userData, last_name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={userData.email}
              readOnly={!isEditing}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              value={userData.phone_number}
              readOnly={!isEditing}
              onChange={(e) => setUserData({ ...userData, phone_number: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              value={userData.department}
              readOnly={!isEditing}
              onChange={(e) => setUserData({ ...userData, department: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <input type="text" value={userData.role} readOnly />
          </div>

          <div className="profile-actions">
            {!isEditing ? (
              <button onClick={handleEditClick} className="btn-edit">Edit</button>
            ) : (
              <button onClick={handleSave} className="btn-save">Save</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
