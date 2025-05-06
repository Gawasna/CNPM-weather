import React from 'react';
import { getDate } from '../utils/weatherUtils'; // Import utility function

function CurrentWeather({ weatherData }) {
  // Destructure necessary data from the prop
  if (!weatherData) return null; // Don't render if data is not available

  const {
    weather,
    dt: dateUnix,
    main: { temp },
    timezone,
    locationInfo // This comes from the reverseGeo fetch in Layout
  } = weatherData;
  const [{ description, icon }] = weather;

  // Safely access location info
  const locationName = locationInfo?.name || 'Unknown Location';
  const locationCountry = locationInfo?.country || '';

  return (
    <section className="section current-weather" aria-label="current weather" data-current-weather>
      <div className="card card-lg current-weather-card">
        <h2 className="title-2 card-title">Now</h2>

        <div className="weapper">
          <p className="heading">{parseInt(temp)}°<sup>c</sup></p>
          {/* Image path relative to public directory */}
          <img src={`/assets/images/weather_icons/${icon}.png`} width="64" height="64" alt={description}
            className="weather-icon" />
        </div>

        <p className="body-3">{description}</p>

        <ul className="meta-list">
          <li className="meta-item">
            <span className="m-icon">calendar_today</span>
            <p className="title-3 meta-text">{getDate(dateUnix, timezone)}</p> {/* Use utility for date */}
          </li>
          <li className="meta-item">
            <span className="m-icon">location_on</span>
            <p className="title-3 meta-text" data-location>{`${locationName}, ${locationCountry}`}</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default CurrentWeather;