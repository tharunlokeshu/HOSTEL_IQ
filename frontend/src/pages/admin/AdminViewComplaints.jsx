import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminComplaints.css';
import { FaCheckCircle } from 'react-icons/fa';

export default function AdminViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchComplaints = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setErrorMessage('Admin not logged in. Please login again.');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get('http://127.0.0.1:8000/api/helpdesk/admin/complaints/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints(res.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.code === 'token_not_valid'
      ) {
        setErrorMessage('Session expired. Please log in again.');
        localStorage.removeItem('adminToken');
      } else {
        setErrorMessage('❌ Failed to fetch complaints. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const markResolved = async (id) => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      alert('Admin not logged in.');
      return;
    }

    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/helpdesk/admin/complaints/${id}/`,
        { status: 'resolved' },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchComplaints(); // Refresh list after update
    } catch (error) {
      console.error('Error updating complaint:', error);
      alert('❌ Failed to mark complaint as resolved.');
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="admin-complaints-page">
      <h2>📋 All Complaints</h2>

      {loading ? (
        <p>Loading complaints...</p>
      ) : errorMessage ? (
        <p className="error">{errorMessage}</p>
      ) : (
        <table className="complaints-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Room</th>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Created</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c) => (
              <tr key={c.id}>
                <td data-label="ID">{c.id}</td>
                <td data-label="Room">{c.room_number}</td>
                <td data-label="Title">{c.title}</td>
                <td data-label="Description">{c.description}</td>
                <td
                  data-label="Status"
                  className={c.status === 'resolved' ? 'resolved' : 'pending'}
                >
                  {c.status}
                </td>
                <td data-label="Created">
                  {new Date(c.created_at).toLocaleString()}
                </td>
                <td data-label="Action">
                  {c.status !== 'resolved' && (
                    <button
                      onClick={() => markResolved(c.id)}
                      className="resolve-btn"
                    >
                      <FaCheckCircle /> Mark Resolved
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
