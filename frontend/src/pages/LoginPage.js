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
      const res = await axios.post('https://pragati-hostel.onrender.com/api/auth/login/', adminData);
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
      const res = await axios.post('https://pragati-hostel.onrender.com/api/auth/login/', studentData);
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
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/hostel-iq.jpeg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.85)',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '40px',
          justifyContent: 'center',
          maxWidth: '900px',
          width: '100%',
        }}
      >
        {/* Admin Login */}
        <form
          onSubmit={handleAdminLogin}
          style={{
            flex: '1 1 300px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <h2 style={{ textAlign: 'center' }}>Admin Login</h2>
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
        <form
          onSubmit={handleStudentLogin}
          style={{
            flex: '1 1 300px',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
          }}
        >
          <h2 style={{ textAlign: 'center' }}>Student Login</h2>
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

        {/* Sign Up Link */}
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '14px',
          }}
        >
          <p>
            Don't have an account?{' '}
            <span
              style={{ color: '#007bff', cursor: 'pointer', fontWeight: 'bold' }}
              onClick={() => navigate('/register')}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
