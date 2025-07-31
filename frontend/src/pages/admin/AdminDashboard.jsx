import React from 'react';
import {
  FaUserCog,
  FaUsers,
  FaClipboardCheck,
  FaHistory,
  FaBullhorn,
  FaDoorOpen,
  FaComments,
  FaBriefcaseMedical, // ⬅️ New icon
  FaChartBar,
  FaBed,
  FaBoxOpen,          // ⬅️ New icon
  FaFileCsv,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <h1 className="dashboard-heading">🛠️ Admin Dashboard</h1>
      <div className="card-grid">
        <div className="card" onClick={() => navigate('/admin/profile')}>
          <FaUserCog size={36} />
          <span>My Profile</span>
        </div>
        <div className="card" onClick={() => navigate('/admin/total-students')}>
          <FaUsers size={36} />
          <span>Total Students</span>
        </div>
        <div className="card" onClick={() => navigate('/admin/view-complaints')}>
          <FaClipboardCheck size={36} />
          <span>View Complaints</span>
        </div>
        <div className="card" onClick={() => navigate('/admin/notices')}>
          <FaBullhorn size={36} />
          <span>Manage Notices</span>
        </div>
        <div className="card" onClick={() => navigate('/admin/out-pass-requests')}>
          <FaDoorOpen size={36} />
          <span>Out Pass Requests</span>
        </div>
        <div className="card" onClick={() => navigate('/admin/food-feedback')}>
          <FaComments size={36} />
          <span>Food Feedback</span>
        </div>
        <div className="card" onClick={() => navigate('/admin/medical-requests')}>
          <FaBriefcaseMedical size={36} />
          <span>Medical Requests</span>
        </div>
        <div className="card" onClick={() => navigate('/admin/dashboard-analytics')}>
          <FaChartBar size={36} />
          <span>Dashboard Analytics</span>
        </div>
        <div className="card" onClick={() => navigate('/admin/hostel-rooms')}>
          <FaBed size={36} />
          <span>Room Change Requests</span>
        </div>
        <div className="card" onClick={() => navigate('/admin/lost-and-found')}>
          <FaBoxOpen size={36} />
          <span>Lost & Found</span>
        </div>
        <div className="card" onClick={() => navigate('/admin/export-reports')}>
          <FaFileCsv size={36} />
          <span>Export Reports</span>
        </div>
        <div className="card logout" onClick={handleLogout}>
          <FaSignOutAlt size={36} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}
