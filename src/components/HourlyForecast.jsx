import React from 'react';
import { getHours, mps_to_kmh } from '../utils/weatherUtils';
import { useTranslation } from 'react-i18next'; // Import useTranslation

function HourlyForecast({ hourlyData }) {
  const { t, i18n } = useTranslation(); // Use the hook

  if (!hourlyData) return null;

  const {
    list: forecastList,
    city: { timezone }
  } = hourlyData;

  const hourlyItems = forecastList.slice(0, 8);

  return (
    <section className="section hourly-forecast" aria-label={t('hourlyForecast.title')} data-hourly-forecast>
      <h2 className="title-2">{t('hourlyForecast.title')}</h2> {/* Use t() */}

      <div className="slider-container">
        {/* Temperature Forecast */}
        <ul className="slider-list" data-temp>
          {hourlyItems.map((item, index) => {
            const { dt: dateTimeUnix, main: { temp }, weather } = item;
            const [{ icon, description }] = weather;

            return (
              <li key={index} className="slider-item">
                <div className="card card-sm slider-card">
                  {/* Pass locale to utility function */}
                  <p className="body-3">{getHours(dateTimeUnix, timezone, i18n.language)}</p>
                   {/* Use API description for alt/title text */}
                  <img src={`/assets/images/weather_icons/${icon}.png`} width="48" height="48" loading="lazy" alt={description}
                    className="weather-icon" title={description} />
                   {/* Use t() with interpolation for temperature */}
                  <p className="body-3">{t('hourlyForecast.tempUnit', { temp: parseInt(temp) })}</p>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Wind Forecast */}
        <ul className="slider-list" data-wind>
          {hourlyItems.map((item, index) => {
            const { dt: dateTimeUnix, wind: { deg: windDirection, speed: windSpeed } } = item;
            const windSpeedKmh = windSpeed !== undefined ? parseInt(mps_to_kmh(windSpeed)) : 'N/A';

            return (
              <li key={index} className="slider-item">
                <div className="card card-sm slider-card">
                  {/* Pass locale to utility function */}
                  <p className="body-3">{getHours(dateTimeUnix, timezone, i18n.language)}</p>
                   {/* Use t() for alt text */}
                  <img src="/assets/images/weather_icons/direction.png" width="48" height="48" loading="lazy" alt={t('hourlyForecast.windAlt')}
                    className="weather-icon" style={{ transform: `rotate(${windDirection - 180}deg)` }} />
                   {/* Use t() with interpolation for speed and unit */}
                  <p className="body-3">{t('hourlyForecast.windUnit', { speed: windSpeedKmh })}</p>
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