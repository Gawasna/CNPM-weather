import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorPage from './components/ErrorPage';

const DEFAULT_LOCATION = {
  lat: 16.068,
  lon: 108.212, // London coordinates
  name: 'Da Nang', // Optional: provide a default name
  country: 'VN'   // Optional: provide a default country
};
export { DEFAULT_LOCATION };

function App() {
  return (
    <>
      {/* This div is added to match the original article.container styling */}
      {/* React Router manages rendering components within the Route */}
      <Routes>
        {/* Route for displaying weather based on lat/lon */}
        <Route path="/weather" element={<Layout />} />

        {/* Route for getting current location. Layout component will handle the geolocation fetch */}
        <Route path="/current-location" element={<Layout />} />

        {/* Redirect root path to current location or default */}
        <Route path="/" element={<Navigate to="/current-location" replace />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;