import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MedicalEmergency.css';

export default function MedicalEmergency() {
  const [formData, setFormData] = useState({
    name: '',
    roll_number: '',
    issue: '',
    location: '',
    urgency: 'Normal',
  });

  const [reports, setReports] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const urgencyOptions = ['Low', 'Normal', 'High', 'Critical'];
  const accessToken = localStorage.getItem('studentToken');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.post(
        'https://pragati-hostel.onrender.com/api/helpdesk/medical-emergency/create/',
        formData,
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
      setSuccess('Medical emergency reported successfully.');
      setFormData({ name: '', roll_number: '', issue: '', location: '', urgency: 'Normal' });
      fetchMyReports();
    } catch (err) {
      console.error(err);
      setError('Failed to submit emergency. Please check your data or login.');
    }
  };

  const fetchMyReports = async () => {
    try {
      const res = await axios.get('https://pragati-hostel.onrender.com/api/helpdesk/medical-emergency/my/', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      setReports(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch reports.');
    }
  };

  useEffect(() => {
    if (accessToken) {
      fetchMyReports();
    } else {
      setError('Student not logged in. Please login.');
    }
  }, []);

  return (
    <div className="medical-emergency-page">
      <div className="medical-emergency-container">
        <h2 className="title">Report Medical Emergency</h2>

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <form onSubmit={handleSubmit} className="medical-form">
          <input name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
          <input name="roll_number" type="text" placeholder="Roll Number" value={formData.roll_number} onChange={handleChange} required />
          <input name="location" type="text" placeholder="Current Location" value={formData.location} onChange={handleChange} required />
          <textarea name="issue" placeholder="Describe the issue" value={formData.issue} onChange={handleChange} required />
          <select name="urgency" value={formData.urgency} onChange={handleChange}>
            {urgencyOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <button type="submit">Submit Emergency</button>
        </form>

        <h3 className="sub-title">Your Emergency Reports</h3>
        {reports.length === 0 ? (
          <p className="no-reports">No reports found.</p>
        ) : (
          <div className="report-list">
            {reports.map(report => (
              <div key={report.id} className="report-card">
                <p><strong>Issue:</strong> {report.issue}</p>
                <p><strong>Location:</strong> {report.location}</p>
                <p><strong>Urgency:</strong> {report.urgency}</p>
                <p><strong>Status:</strong> {report.status}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
