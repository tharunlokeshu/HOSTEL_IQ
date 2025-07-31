// src/pages/student/StudentProfile.jsx
import React, { useState } from 'react';
import './MyProfile.css';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Tharun Lokesh',
    email: 'tharun@student.edu',
    phone: '9876543210',
    room: 'A-104',
    department: 'CSE',
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    console.log('Saved profile:', profile);
    // TODO: POST updated data to backend
  };

  return (
    <div className="student-profile-page">
      <div className="profile-card">
        <h2>👤 My Profile</h2>
        <div className="profile-item">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="profile-item">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="profile-item">
          <label>Phone</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="profile-item">
          <label>Room No.</label>
          <input
            type="text"
            name="room"
            value={profile.room}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="profile-item">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={profile.department}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>

        <div className="profile-buttons">
          {isEditing ? (
            <button className="save-btn" onClick={handleSave}>Save</button>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
