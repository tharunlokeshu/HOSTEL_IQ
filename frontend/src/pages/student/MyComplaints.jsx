import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MyComplaints.css';

export default function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem('studentToken'); // Must match the key used during login
      if (!token) {
        console.error('No token found. Please log in.');
        return;
      }

      const response = await axios.get('https://pragati-hostel.onrender.com/api/helpdesk/my-history/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints(response.data);
    } catch (error) {
      console.error('Error fetching complaints:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div className="my-complaints">
      <h2>My Complaint History</h2>
      {loading ? (
        <p>Loading...</p>
      ) : complaints.length === 0 ? (
        <p>No complaints submitted yet.</p>
      ) : (
        <ul>
          {complaints.map((complaint) => (
            <li key={complaint.id}>
              <strong>{complaint.title}</strong> - {complaint.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
