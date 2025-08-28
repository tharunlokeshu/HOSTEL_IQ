import React from 'react';
import axios from 'axios';
import './ExportReports.css'; // Optional: style it as you want

export default function ExportReports() {
  const token = localStorage.getItem('adminToken');

  const exportReport = async (endpoint, filename) => {
    try {
      const response = await axios.get(
        `https://pragati-hostel.onrender.com/api/helpdesk/admin/${endpoint}/export/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: 'blob',
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Export error:', error);
      alert('❌ Failed to export. Please ensure you are logged in as admin.');
    }
  };

  return (
    <div className="export-container">
      <h2>📁 Export Reports</h2>
      <div className="export-buttons">
        <button onClick={() => exportReport('complaints', 'complaints.csv')}>Export Complaints</button>
        <button onClick={() => exportReport('outpass', 'outpass_requests.csv')}>Export Outpass Requests</button>
        <button onClick={() => exportReport('room-change', 'room_change_requests.csv')}>Export Room Change</button>
        <button onClick={() => exportReport('medical', 'medical_reports.csv')}>Export Medical Reports</button>
        <button onClick={() => exportReport('lost-found', 'lost_found.csv')}>Export Lost & Found</button>
        <button onClick={() => exportReport('mess-feedback', 'mess_feedback.csv')}>Export Mess Feedback</button>
      </div>
    </div>
  );
}
