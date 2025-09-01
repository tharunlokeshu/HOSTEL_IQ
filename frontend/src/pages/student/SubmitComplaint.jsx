import React, { useState } from "react";
import axios from "axios";
import "./SubmitComplaint.css"; // Make sure to save your CSS as this file

export default function SubmitComplaint() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("studentToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      await axios.post(
        "http://127.0.0.1:8000/api/helpdesk/submit-auth/",
        { title, description, category, room_number: roomNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Complaint submitted successfully!");
      setTitle("");
      setDescription("");
      setCategory("");
      setRoomNumber("");
    } catch (err) {
      console.error(err);
      setError("Failed to submit complaint");
    }
  };

  return (
    <div className="submit-complaint-container">
      <form className="submit-complaint-form" onSubmit={handleSubmit}>
        <h2>Submit a Complaint</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
          required
        />

        <button type="submit">Submit</button>

        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
