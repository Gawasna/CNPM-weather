import React from 'react';
import { aqiText, getTime } from '../utils/weatherUtils'; // Import utility functions

function Highlights({ highlightData, currentWeatherData }) {
  // Don't render if data is not available
  if (!highlightData || !currentWeatherData) return null;

  const {
    list: airPollutionList
  } = highlightData;
  const {
      main: { feels_like, pressure, humidity },
      visibility,
      sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
      timezone // Need timezone from current weather for time formatting
  } = currentWeatherData;

  // Safely access air pollution data
  const {
      main: { aqi } = {}, // Default to empty object if main is undefined
      components: { no2, o3, so2, pm2_5 } = {} // Default to empty object if components is undefined
  } = airPollutionList[0] || {}; // Default to empty array element if list is empty

  const aqiInfo = aqiText[aqi] || { level: 'N/A', message: 'Air quality data not available' };


  return (
    <section className="section highlights" aria-labelledby="highlights-label" data-highlights>
      <h2 className="title-2" id="highlights-label">Today's Highlights</h2> {/* Corrected typo: Todays -> Today's */}

      <div className="highlight-list">

        {/* Air Quality Index Card */}
        <div className="card card-sm highlight-card one">
          <h3 className="title-3">Air Quality Index</h3>
          <div className="wrapper">
            <span className="m-icon">air</span>
            <ul className="card-list">
              {/* Safely check if components exist before rendering */}
              {pm2_5 !== undefined && (
                  <li className="card-item">
                      <p className="title-1">{pm2_5.toPrecision(3)}</p>
                      <p className="label-1">PM<sub>2.5</sub></p>
                  </li>
              )}
              {so2 !== undefined && (
                  <li className="card-item">
                      <p className="title-1">{so2.toPrecision(3)}</p>
                      <p className="label-1">SO<sub>2</sub></p>
                  </li>
              )}
               {no2 !== undefined && (
                  <li className="card-item">
                      <p className="title-1">{no2.toPrecision(3)}</p>
                      <p className="label-1">NO<sub>2</sub></p>
                  </li>
               )}
               {o3 !== undefined && (
                   <li className="card-item">
                       <p className="title-1">{o3.toPrecision(3)}</p>
                       <p className="label-1">O<sub>3</sub></p>
                   </li>
               )}
            </ul>
          </div>
          {/* Use aqi value for dynamic classes and utility for text/title */}
          <span className={`badge aqi-${aqi} label-${aqi}`} title={aqiInfo.message}>
            {aqiInfo.level}
          </span>
        </div>

        {/* Sunrise & Sunset Card */}
        <div className="card card-sm highlight-card two">
          <h3 className="title-3">Sunrise & Sunset</h3>
          <div className="card-list">
            <div className="card-item">
              <span className="m-icon">clear_day</span>
              <div>
                <p className="label-1">Sunrise</p>
                <p className="title-1">{getTime(sunriseUnixUTC, timezone)}</p> {/* Use utility for time */}
              </div>
            </div>
            <div className="card-item">
              <span className="m-icon">clear_night</span>
              <div>
                <p className="label-1">Sunset</p>
                <p className="title-1">{getTime(sunsetUnixUTC, timezone)}</p> {/* Use utility for time */}
              </div>
            </div>
          </div>
        </div>

        {/* Humidity Card */}
        <div className="card card-sm highlight-card">
          <h3 className="title-3">Humidity</h3>
          <div className="wrapper">
            <span className="m-icon">humidity_percentage</span>
            <p className="title-1">{humidity}<sub>%</sub></p>
          </div>
        </div>

        {/* Pressure Card */}
        <div className="card card-sm highlight-card">
          <h3 className="title-3">Pressure</h3>
          <div className="wrapper">
            <span className="m-icon">airwave</span>
            <p className="title-1">{pressure}<sub>hPa</sub></p>
          </div>
        </div>

        {/* Visibility Card */}
        <div className="card card-sm highlight-card">
          <h3 className="title-3">Visibility</h3>
          <div className="wrapper">
            <span className="m-icon">visibility</span>
            <p className="title-1">{visibility / 1000}<sub>km</sub></p> {/* Convert meters to km */}
          </div>
        </div>

        {/* Feels Like Card */}
        <div className="card card-sm highlight-card">
          <h3 className="title-3">Feels Like</h3>
          <div className="wrapper">
            <span className="m-icon">thermostat</span>
            <p className="title-1">{parseInt(feels_like)}°<sup>c</sup></p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Highlights;