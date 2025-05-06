import React from 'react';
import { getHours, mps_to_kmh } from '../utils/weatherUtils'; // Import utility functions

function HourlyForecast({ hourlyData }) {
  // Don't render if data is not available
  if (!hourlyData) return null;

  const {
    list: forecastList,
    city: { timezone }
  } = hourlyData;

  // Get the first 8 entries for the 24-hour forecast
  const hourlyItems = forecastList.slice(0, 8);


  return (
    <section className="section hourly-forecast" aria-label="hourly forecast" data-hourly-forecast>
      <h2 className="title-2">Today at</h2>

      <div className="slider-container">
        {/* Temperature Forecast */}
        <ul className="slider-list" data-temp>
          {hourlyItems.map((item, index) => {
            const { dt: dateTimeUnix, main: { temp }, weather } = item;
            const [{ icon, description }] = weather;

            return (
              <li key={index} className="slider-item"> {/* Add key */}
                <div className="card card-sm slider-card">
                  <p className="body-3">{getHours(dateTimeUnix, timezone)}</p> {/* Use utility for hours */}
                  {/* Image path relative to public directory */}
                  <img src={`/assets/images/weather_icons/${icon}.png`} width="48" height="48" loading="lazy" alt={description}
                    className="weather-icon" title={description} />
                  <p className="body-3">{parseInt(temp)}°</p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Wind Forecast */}
        <ul className="slider-list" data-wind>
          {hourlyItems.map((item, index) => {
            const { dt: dateTimeUnix, wind: { deg: windDirection, speed: windSpeed } } = item;

             // Ensure windSpeed is a number before conversion
            const windSpeedKmh = windSpeed !== undefined ? parseInt(mps_to_kmh(windSpeed)) : 'N/A';

            return (
              <li key={index} className="slider-item"> {/* Add key */}
                <div className="card card-sm slider-card">
                  <p className="body-3">{getHours(dateTimeUnix, timezone)}</p> {/* Use utility for hours */}
                   {/* Image path relative to public directory. Apply rotation style. */}
                  <img src="/assets/images/weather_icons/direction.png" width="48" height="48" loading="lazy" alt="direction"
                    className="weather-icon" style={{ transform: `rotate(${windDirection - 180}deg)` }} /> {/* Inline style */}
                  <p className="body-3">{windSpeedKmh} km/h</p> {/* Display converted speed */}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default HourlyForecast;