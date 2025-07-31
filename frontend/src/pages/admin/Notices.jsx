import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateNotice.css';

export default function CreateNotice() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [notices, setNotices] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchNotices = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/helpdesk/notices/');
      setNotices(res.data.reverse()); // newest first
    } catch (err) {
      console.error('Error fetching notices:', err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const token = localStorage.getItem('adminToken');

    if (!token) {
      setError('Admin not logged in.');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8000/api/helpdesk/notices/create/',
        { title, message },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setSuccess('✅ Notice posted successfully!');
      setTitle('');
      setMessage('');
      fetchNotices();
    } catch (err) {
      console.error(err);
      setError('❌ Failed to post notice.');
    }
  };

  return (
    <div className="notice-container">
      <div className="notice-card">
        <h2 className="notice-title">📢 Post New Notice</h2>
        <form onSubmit={handleSubmit} className="notice-form">
          <input
            type="text"
            placeholder="Enter Notice Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Enter Notice Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            required
          />
          <button type="submit">Post Notice</button>
          {error && <p className="notice-error">{error}</p>}
          {success && <p className="notice-success">{success}</p>}
        </form>
      </div>

      <div className="notice-list-section">
        <h3 className="notice-subtitle">📃 All Notices</h3>
        <div className="notice-list">
          {notices.length === 0 ? (
            <p className="notice-empty">No notices available.</p>
          ) : (
            notices.map((notice) => (
              <div key={notice.id} className="notice-item">
                <h4>{notice.title}</h4>
                <p>{notice.message}</p>
                <span className="notice-date">{new Date(notice.created_at).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
