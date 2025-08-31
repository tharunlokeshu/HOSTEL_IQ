import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminRoomChangeRequests.css"; // Import the CSS file

export default function AdminRoomChangeRequests() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [statusUpdates, setStatusUpdates] = useState({});
  const token = localStorage.getItem("adminToken");

  const fetchRequests = async () => {
    if (!token) {
      setError("Admin not logged in. Please login again.");
      return;
    }

    try {
      const response = await axios.get(
        "https://pragati-hostel.onrender.com/api/helpdesk/admin/room-change/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setRequests(response.data);
    } catch (err) {
      setError("Failed to fetch room change requests.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleInputChange = (id, field, value) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (id) => {
    const update = statusUpdates[id];
    if (!update || !update.status) return;

    try {
      await axios.patch(
        `https://pragati-hostel.onrender.com/api/helpdesk/admin/room-change/${id}/`,
        {
          status: update.status,
          admin_comment: update.admin_comment || "",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchRequests(); // Refresh after update
    } catch (err) {
      alert("Failed to update request.");
    }
  };

  return (
    <div className="admin-room-container">
      <h2 className="admin-room-title">Room Change Requests</h2>

      {error && <p className="admin-room-error">{error}</p>}

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Current Room</th>
              <th>Requested Room</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Admin Action</th>
              <th>Submit</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="7" className="admin-empty">
                  No room change requests found.
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req.id}>
                  <td data-label="Student">{req.student_name || req.student}</td>
                  <td data-label="Current Room">{req.current_room}</td>
                  <td data-label="Requested Room">{req.requested_room}</td>
                  <td data-label="Reason">{req.reason}</td>
                  <td data-label="Status" className="capitalize">{req.status}</td>
                  <td data-label="Admin Action">
                    {req.status === "pending" ? (
                      <div className="admin-actions">
                        <select
                          value={statusUpdates[req.id]?.status || ""}
                          onChange={(e) =>
                            handleInputChange(req.id, "status", e.target.value)
                          }
                        >
                          <option value="">Select</option>
                          <option value="approved">Approve</option>
                          <option value="rejected">Reject</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Add comment"
                          value={statusUpdates[req.id]?.admin_comment || ""}
                          onChange={(e) =>
                            handleInputChange(req.id, "admin_comment", e.target.value)
                          }
                        />
                      </div>
                    ) : (
                      <span className="admin-updated">Updated</span>
                    )}
                  </td>
                  <td data-label="Submit">
                    {req.status === "pending" && (
                      <button
                        onClick={() => handleSubmit(req.id)}
                        className="admin-submit-btn"
                      >
                        Submit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
