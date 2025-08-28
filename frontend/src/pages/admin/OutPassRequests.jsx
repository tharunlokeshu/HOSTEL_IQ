import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OutPassRequests.css"; // your CSS file

const AdminOutPassRequests = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  // Fetch all out-pass requests
  const fetchRequests = async (accessToken) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://pragati-hostel.onrender.com/api/helpdesk/out-pass/all/",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setRequests(response.data);
      setError("");
    } catch (err) {
      if (err.response?.status === 401) {
        const refreshed = await tryRefreshToken();
        if (refreshed) {
          fetchRequests(localStorage.getItem("adminToken"));
        } else {
          setError("Session expired. Please login again.");
        }
      } else if (err.response?.status === 403) {
        setError("You do not have permission to access this resource.");
      } else {
        setError("Failed to fetch out pass requests.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Refresh JWT token
  const tryRefreshToken = async () => {
    const refreshToken = localStorage.getItem("adminRefreshToken");
    if (!refreshToken) return false;
    try {
      const response = await axios.post(
        "https://pragati-hostel.onrender.com/api/auth/token/refresh/",
        { refresh: refreshToken }
      );
      localStorage.setItem("adminToken", response.data.access);
      return true;
    } catch {
      return false;
    }
  };

  // Update status of one request: PATCH status
  const updateStatus = async (id, newStatus) => {
    const accessToken = localStorage.getItem("adminToken");
    if (!accessToken) {
      alert("Admin not logged in. Please login again.");
      return;
    }

    try {
      await axios.patch(
        `https://pragati-hostel.onrender.com/api/helpdesk/out-pass/${id}/`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      setSuccessMsg(`Request ${id} marked as ${newStatus}!`);
      fetchRequests(accessToken); // Refresh list after update
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update out pass status.");
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("adminToken");
    if (!accessToken) {
      setError("Admin not logged in. Please login again.");
      return;
    }
    fetchRequests(accessToken);
  }, []);

  return (
    <div className="admin-outpass-container">
      <div className="admin-outpass-content">
        <h1 className="admin-title">📝 Admin Out Pass Requests</h1>

        {error && <div className="admin-error-box">{error}</div>}
        {successMsg && <div className="admin-success-box">{successMsg}</div>}
        {loading && <div className="admin-loading">Loading...</div>}

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead className="admin-thead">
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Reason</th>
                <th>Destination</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Requested At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.length === 0 ? (
                <tr>
                  <td colSpan="9" className="admin-empty">
                    No out pass requests found.
                  </td>
                </tr>
              ) : (
                requests.map((req) => (
                  <tr key={req.id} className="admin-row">
                    <td>{req.id}</td>
                    <td>{req.name || "N/A"}</td>
                    <td>{req.reason}</td>
                    <td>{req.destination}</td>
                    <td>{req.from_date}</td>
                    <td>{req.to_date}</td>
                    <td>
                      <span className={`status-badge ${req.status}`}>
                        {req.status}
                      </span>
                    </td>
                    <td>{new Date(req.created_at).toLocaleString()}</td>
                    <td>
                      {req.status === "pending" ? (
                        <div className="admin-actions">
                          <button
                            className="btn-approve"
                            onClick={() => updateStatus(req.id, "approved")}
                          >
                            ✅ Approve
                          </button>
                          <button
                            className="btn-reject"
                            onClick={() => updateStatus(req.id, "rejected")}
                          >
                            ❌ Reject
                          </button>
                        </div>
                      ) : (
                        <span className="status-final">{req.status}</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminOutPassRequests;
