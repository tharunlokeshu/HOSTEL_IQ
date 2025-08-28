import React, { useEffect, useState } from "react";
import "./FoodFeedback.css";

const AdminViewFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    fetch("https://pragati-hostel.onrender.com/api/helpdesk/mess-feedback/all/")
      .then((res) => res.json())
      .then((data) => setFeedbacks(data))
      .catch((err) => console.error("Error fetching feedbacks:", err));
  }, []);

  return (
    <div className="feedback-container">
      <h2 className="feedback-title">Mess Feedbacks</h2>
      <div className="feedback-table-wrapper">
        <table className="feedback-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Roll Number</th>
              <th>Rating</th>
              <th>Comments</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.full_name}</td>
                <td>{item.roll_number}</td>
                <td>{item.rating} ⭐</td>
                <td>{item.comments}</td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminViewFeedback;
