import React from 'react';
import {
  FaPlusCircle,
  FaClipboardList,
  FaSignOutAlt,
  FaUtensils,
  FaBook,
  FaDoorOpen,
  FaUser,
  FaBullhorn,
  FaBed,
  FaFirstAid,
  FaSearch,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './StudentDashboard.css';

export default function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="student-dashboard">
      <h1 className="dashboard-heading">🎓 Student Dashboard</h1>
      <div className="card-grid">
        <div className="card" onClick={() => navigate('/student/profile')}>
          <FaUser size={36} color="#0dcaf0" />
          <span>My Profile</span>
        </div>
        <div className="card" onClick={() => navigate('/student/submit-complaint')}>
          <FaPlusCircle size={36} color="#0d6efd" />
          <span>Submit Complaint</span>
        </div>
        <div className="card" onClick={() => navigate('/student/my-complaints')}>
          <FaClipboardList size={36} color="#198754" />
          <span>My Complaints</span>
        </div>
        <div className="card" onClick={() => navigate('/student/mess-feedback')}>
          <FaUtensils size={36} color="#fd7e14" />
          <span>Mess Feedback</span>
        </div>
        <div className="card" onClick={() => navigate('/student/hostel-menu')}>
          <FaBook size={36} color="#6610f2" />
          <span>Hostel Menu</span>
        </div>
        <div className="card" onClick={() => navigate('/student/out-pass')}>
          <FaDoorOpen size={36} color="#6f42c1" />
          <span>Out Pass</span>
        </div>
        <div className="card" onClick={() => navigate('/student/medical-emergency')}>
          <FaFirstAid size={36} color="#20c997" />
          <span>Medical Emergency</span>
        </div>
        <div className="card" onClick={() => navigate('/student/lost-found')}>
          <FaSearch size={36} color="#e83e8c" />
          <span>Lost & Found</span>
        </div>
        <div className="card" onClick={() => navigate('/student/room-change')}>
          <FaBed size={36} color="#fd007b" />
          <span>Room Change</span>
        </div>
        <div className="card" onClick={() => navigate('/student/notices')}>
          <FaBullhorn size={36} color="#198eee" />
          <span>Notices</span>
        </div>
        <div className="card" onClick={handleLogout}>
          <FaSignOutAlt size={36} color="#dc3545" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
