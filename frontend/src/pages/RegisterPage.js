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
      const response = await axios.post('http://127.0.0.1:8000/api/auth/register/', {
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
    <div className="auth-page">
      <h1 className="auth-title">Student Registration</h1>
      <div className="register-container">
        <form
          className="register-section"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister(studentData, setStudentError, setLoadingStudent);
          }}
        >
          <h2>Register as Student</h2>

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
      </div>
    </div>
  );
}
