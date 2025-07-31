import React, { useState, useEffect } from "react";
import axios from "axios";
import "./RoomChange.css";

export default function RoomChange() {
  const [formData, setFormData] = useState({
    current_room: "",
    requested_room: "",
    reason: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const fetchHistory = async () => {
    const token = localStorage.getItem("studentToken");
    if (!token) {
      setError("Student not logged in. Please login again.");
      return;
    }

    try {
      const response = await axios.get(
        "http://localhost:8000/api/helpdesk/room-change/my-requests/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setHistory(response.data);
    } catch (err) {
      setError("Failed to fetch request history.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("studentToken");
    if (!token) {
      setError("Student not logged in. Please login again.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/helpdesk/room-change/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Room change request submitted successfully!");
      setError("");
      setFormData({ current_room: "", requested_room: "", reason: "" });
      fetchHistory();
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to submit request.");
      setMessage("");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="room-change-container">
      <h2 className="room-change-title">Room Change Request</h2>

      {message && <div className="success-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="room-change-form">
        <label>
          Current Room
          <input
            type="text"
            name="current_room"
            value={formData.current_room}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Requested Room
          <input
            type="text"
            name="requested_room"
            value={formData.requested_room}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Reason
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" className="submit-button">
          Submit Request
        </button>
      </form>

      <div className="room-change-history">
        <h3>Your Room Change History</h3>
        {history.length === 0 ? (
          <p className="no-history">No previous requests found.</p>
        ) : (
          history.map((item) => (
            <div key={item.id} className="history-card">
              <div>
                <p>
                  <strong>Current:</strong> {item.current_room}
                </p>
                <p>
                  <strong>Requested:</strong> {item.requested_room}
                </p>
                <p>
                  <strong>Reason:</strong> {item.reason}
                </p>
              </div>
              <div className={`status ${item.status}`}>
                <p>{item.status}</p>
                <p className="date">
                  {new Date(item.created_at).toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
