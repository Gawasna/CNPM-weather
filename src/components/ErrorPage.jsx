import React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_LOCATION } from '../App'; // Import default location

function ErrorPage({ message = "Page not found!" }) {
  // Construct the default location path including lat/lon
  const defaultHomePath = `#/weather?lat=${DEFAULT_LOCATION.lat}&lon=${DEFAULT_LOCATION.lon}`;

  return (
    // The error-content display is handled directly by CSS based on its presence in the DOM.
    // In React, we conditionally render this component.
    <section className="error-content" data-error-content style={{ display: 'flex' }}> {/* Ensure it's displayed when rendered */}
      <h2 className="heading">404</h2>
      <p className="body-1">{message}</p> {/* Use the passed message */}
      <Link to={defaultHomePath} className="btn-primary">
        <span className="span">Go Home</span>
      </Link>
    </section>
  );
}

export default ErrorPage;