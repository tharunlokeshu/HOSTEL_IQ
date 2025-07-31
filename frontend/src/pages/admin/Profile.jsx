import React, { useState } from 'react';
import './Profile.css';
import { FaUserEdit } from 'react-icons/fa';

export default function AdminProfile() {
  const [adminInfo, setAdminInfo] = useState({
    name: 'Admin Tharun',
    email: 'admin@example.com',
    role: 'Administrator',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setAdminInfo({ ...adminInfo, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Optionally send data to backend here
    setIsEditing(false);
  };

  return (
    <div className="admin-profile-container">
      <h1 className="profile-title">
        <FaUserEdit /> Admin Profile
      </h1>

      <div className="profile-box">
        <label>Name</label>
        {isEditing ? (
          <input
            name="name"
            value={adminInfo.name}
            onChange={handleChange}
          />
        ) : (
          <p>{adminInfo.name}</p>
        )}

        <label>Email</label>
        {isEditing ? (
          <input
            name="email"
            value={adminInfo.email}
            onChange={handleChange}
          />
        ) : (
          <p>{adminInfo.email}</p>
        )}

        <label>Role</label>
        <p>{adminInfo.role}</p>

        <div className="btn-group">
          {isEditing ? (
            <button className="save-btn" onClick={handleSave}>Save</button>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
}
