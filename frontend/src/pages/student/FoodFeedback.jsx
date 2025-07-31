import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './FoodFeedback.css';

const MessFeedback = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    roll_number: '',
    rating: 0,
    comments: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setFormData({ ...formData, rating: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.full_name || !formData.roll_number || !formData.rating || !formData.comments) {
      toast.error('Please fill in all fields!');
      return;
    }

    setSubmitting(true);
    try {
      await axios.post('http://localhost:8000/api/helpdesk/mess-feedback/', formData);
      toast.success('Feedback submitted successfully!');
      setFormData({ full_name: '', roll_number: '', rating: 0, comments: '' });
    } catch (err) {
      toast.error('Failed to submit feedback!');
    } finally {
      setSubmitting(false);
    }
  };

  // Clear toasts on unmount
  useEffect(() => {
    return () => toast.dismiss();
  }, []);

  return (
    <div className="mess-feedback-container">
      <ToastContainer />
      <h2>🍽️ Mess Feedback</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
          disabled={submitting}
        />
        <input
          type="text"
          name="roll_number"
          placeholder="Roll Number"
          value={formData.roll_number}
          onChange={handleChange}
          disabled={submitting}
        />

        <div className="rating">
          <label>Rating:</label>
          <div className="stars" role="radiogroup" aria-label="Rating stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                role="radio"
                tabIndex={0}
                aria-checked={formData.rating === star}
                onClick={() => handleRating(star)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleRating(star);
                  }
                }}
                className={formData.rating >= star ? 'filled' : ''}
                aria-label={`${star} star${star > 1 ? 's' : ''}`}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <textarea
          name="comments"
          placeholder="Your comments..."
          value={formData.comments}
          onChange={handleChange}
          disabled={submitting}
        />

        <button type="submit" disabled={submitting}>
          {submitting ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
};

export default MessFeedback;
