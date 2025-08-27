import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function LoginPage() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({ username: '', password: '' });
  const [studentData, setStudentData] = useState({ username: '', password: '' });
  const [adminError, setAdminError] = useState('');
  const [studentError, setStudentError] = useState('');

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminError('');
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/login/', adminData);
      const { access, refresh, is_admin, username } = res.data;

      if (is_admin) {
        localStorage.setItem('adminToken', access);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('user', JSON.stringify({ username, is_admin }));
        navigate('/admin');
      } else {
        setAdminError('❌ Not an admin account');
      }
    } catch {
      setAdminError('❌ Invalid admin credentials');
    }
  };

  const handleStudentLogin = async (e) => {
    e.preventDefault();
    setStudentError('');
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/login/', studentData);
      const { access, refresh, is_admin, username } = res.data;

      if (!is_admin) {
        localStorage.setItem('studentToken', access);
        localStorage.setItem('refresh', refresh);
        localStorage.setItem('user', JSON.stringify({ username, is_admin }));
        navigate('/student');
      } else {
        setStudentError('❌ Not a student account');
      }
    } catch {
      setStudentError('❌ Invalid student credentials');
    }
  };

  return (
    <div className="login-page">
      <div className="login-overlay">
        <h1 className="title">Welcome to Hostel IQ Portal</h1>
        <div className="login-wrapper">
          {/* Admin Login */}
          <form className="login-card" onSubmit={handleAdminLogin}>
            <h2>Admin Login</h2>
            {adminError && <p className="error">{adminError}</p>}
            <input
              type="text"
              placeholder="Username"
              value={adminData.username}
              onChange={(e) => setAdminData({ ...adminData, username: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={adminData.password}
              onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
              required
            />
            <button type="submit">Login</button>
          </form>

          {/* Student Login */}
          <form className="login-card" onSubmit={handleStudentLogin}>
            <h2>Student Login</h2>
            {studentError && <p className="error">{studentError}</p>}
            <input
              type="text"
              placeholder="Username"
              value={studentData.username}
              onChange={(e) => setStudentData({ ...studentData, username: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={studentData.password}
              onChange={(e) => setStudentData({ ...studentData, password: e.target.value })}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}