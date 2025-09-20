import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/student/StudentDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminViewComplaints from './pages/admin/AdminViewComplaints'; 
import FoodFeedback from './pages/admin/FoodFeedback';
import SubmitComplaint from './pages/student/SubmitComplaint';
import MyComplaints from './pages/student/MyComplaints';
import MessFeedback from './pages/student/FoodFeedback'; // case must match file
import HostelMenu from './pages/student/HostelMenu';
import OutPass from './pages/student/OutPass';
import MedicalEmergency from './pages/student/MedicalEmergency';
import LostFound from './pages/student/LostFound';
import MyProfile from './pages/student/MyProfile';
import RoomChange from './pages/student/RoomChange';
import Notices from './pages/student/Notices';
import Profile from './pages/admin/Profile';
import TotalStudents from './pages/admin/TotalStudents'; // Ensure this path is correct
import AdminNotices from './pages/admin/Notices'; // Ensure this path is correct
import OutPassRequests from './pages/admin/OutPassRequests';
import AdminMedicalRequests from './pages/admin/AdminMedicalRequests';
import AdminLostAndFound from './pages/admin/AdminLostAndFound';
import DashboardAnalytics from './pages/admin/DashboardAnalytics';
import HostelRooms from './pages/admin/HostelRooms';
import AdminExportReports from './pages/admin/AdminExportReports';
// Ensure this path is correct
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Optional: Duplicate dashboard path based on role */}
        <Route path="/dashboard" element={<RoleBasedRedirect />} />
        
        <Route path="/admin/view-complaints" element={<AdminViewComplaints />} />
        <Route path="/admin/food-feedback" element={<FoodFeedback />} />
         <Route path="/student/submit-complaint" element={<SubmitComplaint />} />
         <Route path="/student/my-complaints" element={<MyComplaints />} />
        <Route path="/student/mess-feedback" element={<MessFeedback />} />
        <Route path="/student/hostel-menu" element={<HostelMenu />} />
        <Route path="/student/out-pass" element={<OutPass />} />
        <Route path="/student/medical-emergency" element={<MedicalEmergency />} />
        <Route path="/student/lost-found" element={<LostFound />} />
        <Route path="/student/profile" element={<MyProfile />} />
        <Route path="/student/room-change" element={<RoomChange />} />
        <Route path="/student/notices" element={<Notices />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/admin/total-students" element={<TotalStudents />} />
        <Route path="/admin/notices" element={<AdminNotices />} />
        <Route path="/admin/out-pass-requests" element={<OutPassRequests />} />
        <Route path="/admin/medical-requests" element={<AdminMedicalRequests />} />
        <Route path="/admin/lost-and-found" element={<AdminLostAndFound />} />
        <Route path="/admin/dashboard-analytics" element={<DashboardAnalytics />} />
        <Route path="/admin/hostel-rooms" element={<HostelRooms />} />
        <Route path="/admin/export-reports" element={<AdminExportReports />} />

        {/* Catch-all route for SPA - this handles direct URL access and page refreshes */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

// ✅ Dynamic redirect component based on role stored in localStorage (or state)
function RoleBasedRedirect() {
  const isAdmin = localStorage.getItem('is_admin') === 'true';

  if (isAdmin) {
    return <Navigate to="/admin" />;
  } else {
    return <Navigate to="/student" />;
  }
}

export default App;

