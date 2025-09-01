import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyComplaints.css"; // Import the responsive CSS

export default function MyComplaints() {
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("studentToken");

  const fetchHistory = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/helpdesk/my-history/",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setHistory(res.data);
    } catch (err) {
      console.error(err);
      setMessage("Failed to fetch complaint history");
    }
  };

  useEffect(() => {
    if (token) fetchHistory();
  }, [token]);

  // Function to get status class for badge
  const getStatusClass = (status) => {
    if (status === "pending") return "status-badge status-pending";
    if (status === "in_progress") return "status-badge status-in_progress";
    if (status === "resolved") return "status-badge status-resolved";
    return "status-badge";
  };

  return (
    <div className="professional-container">
      <div className="professional-card professional-history">
        <h2>My Complaint History</h2>
        {message && <p className="error">{message}</p>}
        {history.length === 0 ? (
          <p>No complaints yet.</p>
        ) : (
          <ul>
            {history.map((complaint) => (
              <li key={complaint.id}>
                <strong>{complaint.title}</strong>
                <span className={getStatusClass(complaint.status)}>
                  {complaint.status.replace("_", " ").toUpperCase()}
                </span>
                <p>{complaint.description}</p>
                <p>
                  <strong>Room:</strong> {complaint.room_number}
                </p>
                <p>
                  <strong>Created:</strong>{" "}
                  {new Date(complaint.created_at).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
