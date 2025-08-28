import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotices = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://pragati-hostel.onrender.com///api/helpdesk/notices/');
      setNotices(response.data);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>📢 Notices</h2>
        <button
          onClick={fetchNotices}
          style={{
            padding: '6px 12px',
            background: '#111',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {notices.length === 0 ? (
            <p style={{ color: '#555' }}>No notices available.</p>
          ) : (
            notices.map((notice) => (
              <li key={notice.id} style={{ paddingBottom: '16px', marginBottom: '16px', borderBottom: '1px solid #ddd' }}>
                <h4 style={{ margin: '0 0 4px 0', color: '#111' }}>{notice.title}</h4>
                <p style={{ margin: '0 0 4px 0', color: '#333' }}>{notice.message}</p>
                <small style={{ color: '#888' }}>{new Date(notice.created_at).toLocaleString()}</small>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default StudentNotices;
