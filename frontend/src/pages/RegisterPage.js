import React, { useState } from 'react';
import './RegisterPage.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const navigate = useNavigate();

  const [studentData, setStudentData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [studentError, setStudentError] = useState('');
  const [loadingStudent, setLoadingStudent] = useState(false);

  const handleRegister = async (data, setError, setLoading) => {
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('https://pragati-hostel.onrender.com/api/auth/register/', {
        ...data,
        is_admin: false,
      });

      if (response.status === 201 || response.status === 200) {
        alert('🎉 Registration successful!');
        navigate('/login');
      } else {
        setError('❌ Registration failed. Try again.');
      }
    } catch (err) {
      if (err.response?.data) {
        const messages = Object.entries(err.response.data)
          .map(([key, val]) => `${key}: ${val}`)
          .join(', ');
        setError(`❌ ${messages}`);
      } else {
        setError('❌ Registration error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: 'url("/hostel-iq.jpeg")',
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
          flexDirection: 'column',
          gap: '20px',
          maxWidth: '400px',
          width: '100%',
        }}
      >
        <h1 style={{ textAlign: 'center' }}>Student Registration</h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister(studentData, setStudentError, setLoadingStudent);
          }}
          style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}
        >
          {studentError && <div className="error">{studentError}</div>}

          <input
            type="text"
            placeholder="Username"
            value={studentData.username}
            onChange={(e) => setStudentData({ ...studentData, username: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={studentData.email}
            onChange={(e) => setStudentData({ ...studentData, email: e.target.value })}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={studentData.password}
            onChange={(e) => setStudentData({ ...studentData, password: e.target.value })}
            required
          />

          <button type="submit" disabled={loadingStudent}>
            {loadingStudent ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Sign In Link */}
        <div
          style={{
            width: '100%',
            textAlign: 'center',
            marginTop: '15px',
            fontSize: '14px',
          }}
        >
          <p>
            Already have an account?{' '}
            <span
              style={{ color: '#007bff', cursor: 'pointer', fontWeight: 'bold' }}
              onClick={() => navigate('/login')}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
