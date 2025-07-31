import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage-overlay">
        <nav className="homepage-nav">
          <h1 className="logo">🏠 Hostel IQ</h1>
          <div className="nav-buttons">
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn secondary">Register</Link>
          </div>
        </nav>

        <section className="hero">
          <h2>Smarter Hostel Life Starts Here</h2>
          <p>Manage complaints, feedback, emergencies and more — all in one place.</p>
          <Link to="/register" className="cta-button">Get Started</Link>
        </section>

        <section className="feature-section">
          <h3>🚀 Features</h3>
          <div className="feature-grid">
            <div className="feature-card">🛠️ Complaint Management</div>
            <div className="feature-card">🚪 Room Change Requests</div>
            <div className="feature-card">📢 Admin Notices</div>
            <div className="feature-card">🍽️ Mess Feedback</div>
            <div className="feature-card">🧳 Lost & Found</div>
            <div className="feature-card">🩺 Medical Helpdesk</div>
            <div className="feature-card">🛫 Out Pass System</div>
          </div>
        </section>

        <section className="about-section">
          <h3>🤝 About Hostel IQ</h3>
          <p>
            Hostel IQ is an all-in-one platform to streamline student and admin interactions in hostels.
            No more paperwork or confusion — just clear, fast, and transparent communication.
          </p>
        </section>

        <footer className="homepage-footer">
          © {new Date().getFullYear()} Hostel IQ. Built by Tharun Lokesh Uggina.
        </footer>
      </div>
    </div>
  );
}
