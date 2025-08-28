import React, { useState } from 'react';
import axios from 'axios';
import './SubmitComplaint.css';

export default function SubmitComplaint() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    room_number: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const refreshToken = async () => {
    const refresh = localStorage.getItem('refresh');
    if (!refresh) return null;
    try {
      const res = await axios.post('https://pragati-hostel.onrender.com/api/token/refresh/', { refresh });
      localStorage.setItem('access', res.data.access);
      return res.data.access;
    } catch (err) {
      console.error('❌ Refresh failed:', err.response?.data || err.message);
      return null;
    }
  };

  const submitComplaint = async (token) => {
    return axios.post(
      'https://pragati-hostel.onrender.com/api/helpdesk/submit/',
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let accessToken = localStorage.getItem('access');
    if (!accessToken) {
      setMessage('❌ You must be logged in to submit a complaint.');
      return;
    }

    try {
      const response = await submitComplaint(accessToken);
      setMessage('✅ Complaint submitted successfully!');
      console.log('✅ Response:', response.data);
      setFormData({
        title: '',
        description: '',
        category: '',
        room_number: '',
      });
    } catch (error) {
      const errData = error.response?.data;
      const isExpired = errData?.code === 'token_not_valid' &&
                        errData?.messages?.some(msg => msg.message.includes('expired'));

      if (isExpired) {
        const newToken = await refreshToken();
        if (newToken) {
          try {
            const retry = await submitComplaint(newToken);
            setMessage('✅ Complaint submitted after refreshing token.');
            console.log('✅ Retry response:', retry.data);
            setFormData({
              title: '',
              description: '',
              category: '',
              room_number: '',
            });
          } catch (retryErr) {
            setMessage('❌ Failed after refreshing token.');
            console.error('❌ Retry error:', retryErr.response?.data || retryErr.message);
          }
        } else {
          setMessage('❌ Session expired. Please log in again.');
        }
      } else {
        console.error('❌ Submit error:', errData || error.message);
        setMessage('❌ Failed to submit complaint.');
      }
    }
  };

  return (
    <div className="submit-complaint">
      <form onSubmit={handleSubmit}>
        <h2>Submit Complaint</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="Internet">Internet</option>
        </select>
        <input
          type="text"
          name="room_number"
          placeholder="Room Number"
          value={formData.room_number}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
        {message && (
          <p className={message.startsWith('✅') ? 'success' : 'error'}>{message}</p>
        )}
      </form>
    </div>
  );
}
