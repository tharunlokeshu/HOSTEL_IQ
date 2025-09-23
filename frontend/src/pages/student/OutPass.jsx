import React, { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react"; // ✅ Use QRCodeSVG
import "./OutPass.css";

const SubmitOutPass = () => {
  const [formData, setFormData] = useState({
    name: "",
    roll_number: "",
    reason: "",
    destination: "",
    from_date: "",
    to_date: "",
  });

  const [message, setMessage] = useState("");
  const [outPasses, setOutPasses] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("studentRefreshToken");
      if (!refreshToken) throw new Error("No refresh token found");

      const response = await axios.post(
        "https://pragati-hostel.onrender.com/api/auth/token/refresh/",
        { refresh: refreshToken }
      );

      const newAccessToken = response.data.access;
      localStorage.setItem("studentToken", newAccessToken);
      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      return null;
    }
  };

  const fetchOutPasses = async (token) => {
    try {
      const response = await axios.get(
        "https://pragati-hostel.onrender.com/api/helpdesk/out-pass/my/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOutPasses(response.data);
      setError("");
    } catch (err) {
      if (err.response?.data?.code === "token_not_valid") {
        const newToken = await refreshAccessToken();
        if (newToken) fetchOutPasses(newToken);
        else setError("Session expired. Please login again.");
      } else {
        setError("Failed to fetch your out pass requests.");
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("studentToken");
    if (token) fetchOutPasses(token);
    else setError("Please login to view your out pass requests.");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = localStorage.getItem("studentToken");
    if (!token) {
      setMessage("❌ Please login to submit an out pass request.");
      return;
    }

    try {
      const res = await axios.post(
        "https://pragati-hostel.onrender.com/api/helpdesk/out-pass/",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.status === 201 || res.status === 200) {
        setMessage("✅ Out Pass submitted successfully!");
        setFormData({
          name: "",
          roll_number: "",
          reason: "",
          destination: "",
          from_date: "",
          to_date: "",
        });
        fetchOutPasses(token);
      }
    } catch (err) {
      setMessage("❌ Failed to submit. Please try again.");
    }
  };

  return (
    <div className="outpass-form-container">
      <h2 className="form-title">🎟️ Submit Out Pass Request</h2>

      <form onSubmit={handleSubmit} className="outpass-form">
        <input
          type="text"
          name="name"
          placeholder="Your Full Name"
          className="form-input"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="roll_number"
          placeholder="Your Roll Number"
          className="form-input"
          value={formData.roll_number}
          onChange={handleChange}
          required
        />
        <textarea
          name="reason"
          placeholder="Reason for Out Pass"
          className="form-input"
          value={formData.reason}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          className="form-input"
          value={formData.destination}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="from_date"
          className="form-input"
          value={formData.from_date}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="to_date"
          className="form-input"
          value={formData.to_date}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">
          🚀 Submit Request
        </button>
      </form>

      {message && <p className="form-message">{message}</p>}

      <h3>Your Out Pass Requests</h3>
      {error && <p className="error-message">{error}</p>}

      <table className="outpass-table">
        <thead>
          <tr>
            <th>Reason</th>
            <th>Destination</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
            <th>QR Code</th> {/* QR Column */}
          </tr>
        </thead>
        <tbody>
          {outPasses.length === 0 ? (
            <tr>
              <td colSpan="6">No Out Pass requests found.</td>
            </tr>
          ) : (
            outPasses.map((pass) => {
              // Nicely formatted QR text
              const qrData =
                pass.status === "approved"
                  ? `🏫 Pragati Hostel Out Pass\n\n` +
                    `👤 Name       : ${pass.name}\n` +
                    `🔢 Roll No    : ${pass.roll_number}\n` +
                    `📝 Reason     : ${pass.reason}\n` +
                    `📍 Destination: ${pass.destination}\n` +
                    `📅 From       : ${pass.from_date}\n` +
                    `📅 To         : ${pass.to_date}\n` +
                    `✅ Status     : ${pass.status.toUpperCase()}\n\n` +
                    `📌 Please carry this out pass with you.`
                  : null;

              return (
                <tr key={pass.id}>
                  <td>{pass.reason}</td>
                  <td>{pass.destination}</td>
                  <td>{pass.from_date}</td>
                  <td>{pass.to_date}</td>
                  <td>
                    <span className={`status-badge ${pass.status}`}>
                      {pass.status}
                    </span>
                  </td>
                  <td>
                    {pass.status === "approved" ? (
                      <QRCodeSVG
                        value={qrData}
                        size={150}
                        level="H"
                        includeMargin={true}
                      />
                    ) : (
                      <span>⏳ Waiting Approval</span>
                    )}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default SubmitOutPass;
