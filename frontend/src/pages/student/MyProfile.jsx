import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyProfile.css';

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    room: '',
    department: '',
    image: null,
    imagePreview: '',
  });

  const token = localStorage.getItem('studentToken');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          'http://127.0.0.1:8000/api/student/me/', // Localhost URL
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile({
          fullName: res.data.full_name || '',
          email: res.data.email || '',
          phone: res.data.phone || '',
          room: res.data.room_number || '',
          department: res.data.department || '',
          image: null,
          imagePreview: res.data.image ? `http://127.0.0.1:8000${res.data.image}` : '', // Localhost for images
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, image: file, imagePreview: URL.createObjectURL(file) });
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('full_name', profile.fullName);
      formData.append('email', profile.email);
      formData.append('phone', profile.phone);
      formData.append('room_number', profile.room);
      formData.append('department', profile.department);
      if (profile.image) {
        formData.append('image', profile.image);
      }

      await axios.put(
        'http://127.0.0.1:8000/api/student/me/', // Localhost URL
        formData,
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert('✅ Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('❌ Failed to update profile. Try again.');
    }
  };

  return (
    <div className="student-profile-page">
      <div className="profile-card">
        <h2>👤 My Profile</h2>

        {/* Profile Image Section */}
        <div className="profile-image-section">
          <img
            src={profile.imagePreview || '/default-avatar.png'}
            alt="Profile"
            className="profile-image"
          />
          {isEditing && (
            <div className="profile-buttons">
              <label className="upload-btn">
                Change Profile Image
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </label>
            </div>
          )}
        </div>

        {/* Student Details */}
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

        {/* Edit / Save Button */}
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
