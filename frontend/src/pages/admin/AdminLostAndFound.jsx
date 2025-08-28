import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminLostFound.css';

export default function AdminLostFound() {
  const [lostItems, setLostItems] = useState([]);
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    fetchLostItems();
  }, []);

  const fetchLostItems = async () => {
    try {
      const response = await axios.get('https://pragati-hostel.onrender.com/api/helpdesk/admin/lost-found/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLostItems(response.data);
    } catch (error) {
      console.error('Error fetching lost items:', error);
    }
  };

  const handleUpdateClaimed = async (itemId, updatedClaimed) => {
    const itemToUpdate = lostItems.find((item) => item.id === itemId);

    try {
      await axios.put(
        `https://pragati-hostel.onrender.com/api/helpdesk/admin/lost-found/${itemId}/update/`,
        {
          item_name: itemToUpdate.item_name,
          description: itemToUpdate.description,
          location_found: itemToUpdate.location_found,
          is_claimed: updatedClaimed,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchLostItems(); // refresh UI
    } catch (error) {
      console.error('Error updating claim status:', error);
    }
  };

  return (
    <div className="admin-lost-found-container">
      <h2 className="admin-lost-found-title">Lost & Found – Admin Panel</h2>
      {lostItems.length === 0 ? (
        <p className="no-items">No lost items found.</p>
      ) : (
        lostItems.map((item) => (
          <div key={item.id} className="lost-item-card">
            <h3>{item.item_name}</h3>
            <p><strong>Description:</strong> {item.description}</p>
            <p><strong>Found At:</strong> {item.location_found}</p>
            <p><strong>Submitted:</strong> {new Date(item.created_at).toLocaleString()}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span className={item.is_claimed ? 'claimed' : 'pending'}>
                {item.is_claimed ? 'Claimed' : 'Pending'}
              </span>
            </p>

            <div className="status-section">
              <label><strong>Change Status:</strong></label>
              <select
                value={item.is_claimed ? 'claimed' : 'pending'}
                onChange={(e) => handleUpdateClaimed(item.id, e.target.value === 'claimed')}
              >
                <option value="pending">Pending</option>
                <option value="claimed">Claimed</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
