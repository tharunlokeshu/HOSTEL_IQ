import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminMedicalEmergencies.css';

const AdminMedicalEmergencies = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [error, setError] = useState('');

  const fetchEmergencies = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('https://pragati-hostel.onrender.com/api/helpdesk/admin/medical-emergency/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEmergencies(res.data);
    } catch (err) {
      setError('Failed to fetch medical emergencies.');
      console.error(err);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(
        'https://pragati-hostel.onrender.com/api/helpdesk/admin/medical-emergency/',
        { id, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchEmergencies(); // Refresh list
    } catch (err) {
      setError('Failed to update status.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmergencies();
  }, []);

  return (
    <div className="admin-emergencies-container">
      <h2 className="admin-emergencies-title">Medical Emergency Requests</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div>
        {emergencies.map((emergency) => (
          <div key={emergency.id} className="admin-emergency-card">
            <p><strong>Name:</strong> {emergency.name}</p>
            <p><strong>Roll No:</strong> {emergency.roll_number}</p>
            <p><strong>Issue:</strong> {emergency.issue}</p>
            <p><strong>Location:</strong> {emergency.location}</p>
            <p><strong>Urgency:</strong> {emergency.urgency}</p>
            <p><strong>Status:</strong> {emergency.status}</p>

            <div className="mt-2">
              <label className="admin-status-label">Change Status:</label>
              <select
                value={emergency.status}
                onChange={(e) => handleStatusUpdate(emergency.id, e.target.value)}
                className="admin-status-select"
              >
                <option value="Pending">Pending</option>
                <option value="Acknowledged">Acknowledged</option>
                <option value="Sent to Hospital">Sent to Hospital</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMedicalEmergencies;
