import React from 'react';

function LoadingSpinner() {
  // This component is conditionally rendered in Layout.jsx
  // The original CSS handles the actual spinner animation via ::before
  return (
    <div className="loading" data-loading></div>
  );
}

export default LoadingSpinner;