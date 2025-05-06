import React from 'react';
import { getDate } from '../utils/weatherUtils';
import { useTranslation } from 'react-i18next';

function CurrentWeather({ weatherData }) {
  const { t, i18n } = useTranslation();

  if (!weatherData) return null;

  const {
    weather,
    dt: dateUnix,
    main: { temp },
    timezone,
    locationInfo
  } = weatherData;
  const [{ description, icon }] = weather;

  const locationName = locationInfo?.name || t('geolocation.unknownLocation');
  const locationCountry = locationInfo?.country || '';

  return (
    <section className="section current-weather" aria-label={t('currentWeather.nowTitle')} data-current-weather>
      <div className="card card-lg current-weather-card">
        <h2 className="title-2 card-title">{t('currentWeather.nowTitle')}</h2>

        <div className="weapper">
          <p className="heading">{t('currentWeather.temperatureUnit', { temp: parseInt(temp) })}</p>
          <img src={`/assets/images/weather_icons/${icon}.png`} width="64" height="64" alt={description}
            className="weather-icon" />
        </div>

        <p className="body-3">{description}</p>

        <ul className="meta-list">
          <li className="meta-item">
            {/* Icon text MUST be the English keyword for the font */}
            {/* Use t() for aria-label or alt/title on the *parent* element if needed for accessibility */}
            <span className="m-icon">calendar_today</span> {/* Keep "calendar_today" */}
            <p className="title-3 meta-text">{getDate(dateUnix, timezone, i18n.language)}</p>
          </li>
          <li className="meta-item">
            {/* Icon text MUST be the English keyword for the font */}
            <span className="m-icon">location_on</span> {/* Keep "location_on" */}
            <p className="title-3 meta-text" data-location>{`${locationName}, ${locationCountry}`}</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default CurrentWeather;