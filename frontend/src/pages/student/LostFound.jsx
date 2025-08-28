import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './LostFound.css';

export default function LostFound() {
  const [formData, setFormData] = useState({
    item_name: '',
    description: '',
    location_found: '',
  });
  const [items, setItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('studentToken');
    if (!token) {
      alert('Please login to continue.');
      window.location.href = '/student/login';
      return;
    }

    axios.get('https://pragati-hostel.onrender.com/api/helpdesk/student/lost-found/list/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => setItems(res.data))
      .catch((err) => {
        console.error(err);
        if (err.response && err.response.status === 401) {
          alert('Session expired. Please login again.');
          window.location.href = '/student/login';
        }
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('studentToken');
    try {
      await axios.post('https://pragati-hostel.onrender.com/api/helpdesk/student/lost-found/', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Lost & Found item submitted!');
      setFormData({ item_name: '', description: '', location_found: '' });

      const res = await axios.get('https://pragati-hostel.onrender.com/api/helpdesk/student/lost-found/list/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setItems(res.data);
    } catch (err) {
      console.error(err);
      alert('Failed to submit item. Please try again.');
    }
  };

  return (
    <div className="lostfound-container">
      <h2>Lost & Found Portal</h2>
      <form onSubmit={handleSubmit} className="lostfound-form">
        <input
          type="text"
          name="item_name"
          placeholder="Item Name"
          value={formData.item_name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location_found"
          placeholder="Location Found"
          value={formData.location_found}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Item Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Item</button>
      </form>

      <div className="lostfound-list">
        <h3>Submitted Items</h3>
        {items.length === 0 ? (
          <p>No items found yet.</p>
        ) : (
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <strong>{item.item_name}</strong> – {item.description}<br />
                <em>Found at:</em> {item.location_found}<br />
                <em>Status:</em> {item.is_claimed ? 'Claimed' : 'Unclaimed'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
