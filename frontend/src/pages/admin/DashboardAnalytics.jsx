import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboardAnalytics.css'; // You can style it separately

export default function AdminDashboardAnalytics() {
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAnalytics = async () => {
      const token = localStorage.getItem('adminToken'); // Replace with correct key
      if (!token) {
        setError('Admin not logged in.');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/api/helpdesk/admin/dashboard-analytics/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAnalytics(response.data);
      } catch (err) {
        setError('Failed to load analytics.');
        console.error(err);
      }
    };

    fetchAnalytics();
  }, []);

  if (error) return <div className="error">{error}</div>;
  if (!analytics) return <div className="loading">Loading analytics...</div>;

  return (
    <div className="admin-dashboard-analytics">
      <h2>Admin Dashboard Analytics</h2>

      <div className="dashboard-section">
        <h3>Total Students</h3>
        <p>{analytics.total_students}</p>
      </div>

      <div className="dashboard-section">
        <h3>Complaints</h3>
        <ul>
          <li>Total: {analytics.complaints.total}</li>
          <li>Pending: {analytics.complaints.pending}</li>
          <li>In Progress: {analytics.complaints.in_progress}</li>
          <li>Resolved: {analytics.complaints.resolved}</li>
        </ul>
      </div>

      <div className="dashboard-section">
        <h3>Outpass Requests</h3>
        <ul>
          <li>Total: {analytics.outpass_requests.total}</li>
          <li>Pending: {analytics.outpass_requests.pending}</li>
          <li>Approved: {analytics.outpass_requests.approved}</li>
          <li>Rejected: {analytics.outpass_requests.rejected}</li>
        </ul>
      </div>

      <div className="dashboard-section">
        <h3>Room Change Requests</h3>
        <ul>
          <li>Total: {analytics.room_change_requests.total}</li>
          <li>Pending: {analytics.room_change_requests.pending}</li>
          <li>Approved: {analytics.room_change_requests.approved}</li>
          <li>Rejected: {analytics.room_change_requests.rejected}</li>
        </ul>
      </div>

      <div className="dashboard-section">
        <h3>Medical Emergencies</h3>
        <ul>
          <li>Total: {analytics.medical_emergencies.total}</li>
          <li>Pending: {analytics.medical_emergencies.pending}</li>
          <li>Acknowledged: {analytics.medical_emergencies.acknowledged}</li>
          <li>Sent to Hospital: {analytics.medical_emergencies.hospital}</li>
          <li>Resolved: {analytics.medical_emergencies.resolved}</li>
        </ul>
      </div>
    </div>
  );
}
