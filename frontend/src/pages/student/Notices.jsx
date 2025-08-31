import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Notices.css";

const StudentNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://pragati-hostel.onrender.com/api/helpdesk/notices/");
      setNotices(response.data);
    } catch (error) {
      console.error("Failed to fetch notices:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div className="notices-container">
      <div className="notices-header">
        <h2>📢 Notices</h2>
        <button className="refresh-btn" onClick={fetchNotices}>
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : notices.length === 0 ? (
        <p style={{ color: "#555" }}>No notices available.</p>
      ) : (
        <ul className="notice-list">
          {notices.map((notice) => (
            <li key={notice.id} className="notice-card">
              <h4 className="notice-title">{notice.title}</h4>
              <p className="notice-message">{notice.message}</p>
              <small className="notice-date">
                {new Date(notice.created_at).toLocaleString()}
              </small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentNotices;
