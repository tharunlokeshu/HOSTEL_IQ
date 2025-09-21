import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="not-found-actions">
          <button onClick={handleGoHome} className="btn btn-primary">
            Go to Homepage
          </button>
          <button onClick={handleGoBack} className="btn btn-secondary">
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
