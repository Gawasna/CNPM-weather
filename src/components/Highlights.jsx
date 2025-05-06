import React from 'react';
import { getTime } from '../utils/weatherUtils';
import { useTranslation } from 'react-i18next';

function Highlights({ highlightData, currentWeatherData }) {
  const { t, i18n } = useTranslation();

  if (!highlightData || !currentWeatherData) return null;

  const {
    list: airPollutionList
  } = highlightData;
  const {
      main: { feels_like, pressure, humidity },
      visibility,
      sys: { sunrise: sunriseUnixUTC, sunset: sunsetUnixUTC },
      timezone
  } = currentWeatherData;

  const {
      main: { aqi } = {},
      components: { no2, o3, so2, pm2_5 } = {}
  } = airPollutionList[0] || {};

  const aqiLevelKey = `highlights.airQualityIndex.level.${aqi}`;
  const aqiMessageKey = `highlights.airQualityIndex.message.${aqi}`;
  const aqiLevel = t(aqiLevelKey, { defaultValue: t('highlights.airQualityIndex.level.default') });
  const aqiMessage = t(aqiMessageKey, { defaultValue: t('highlights.airQualityIndex.message.default') });


  return (
    <section className="section highlights" aria-labelledby="highlights-label" data-highlights>
      <h2 className="title-2" id="highlights-label">{t('highlights.title')}</h2>

      <div className="highlight-list">

        {/* Air Quality Index Card */}
        <div className="card card-sm highlight-card one">
          <h3 className="title-3">{t('highlights.airQualityIndex.title')}</h3>
          <div className="wrapper">
             {/* Icon text MUST be the English keyword for the font */}
            <span className="m-icon">air</span> {/* Keep "air" */}
            <ul className="card-list">
              {pm2_5 !== undefined && (
                  <li className="card-item">
                      <p className="title-1">{pm2_5.toPrecision(3)}</p>
                      <p className="label-1">{t('highlights.airQualityIndex.pm25')}</p>
                  </li>
              )}
              {so2 !== undefined && (
                  <li className="card-item">
                      <p className="title-1">{so2.toPrecision(3)}</p>
                      <p className="label-1">{t('highlights.airQualityIndex.so2')}</p>
                  </li>
              )}
               {no2 !== undefined && (
                  <li className="card-item">
                      <p className="title-1">{no2.toPrecision(3)}</p>
                      <p className="label-1">{t('highlights.airQualityIndex.no2')}</p>
                  </li>
               )}
               {o3 !== undefined && (
                   <li className="card-item">
                       <p className="title-1">{o3.toPrecision(3)}</p>
                       <p className="label-1">{t('highlights.airQualityIndex.o3')}</p>
                   </li>
               )}
            </ul>
          </div>
          <span className={`badge aqi-${aqi} label-${aqi}`} title={aqiMessage}>
            {aqiLevel}
          </span>
        </div>

        {/* Sunrise & Sunset Card */}
        <div className="card card-sm highlight-card two">
          <h3 className="title-3">{t('highlights.sunriseSunset.title')}</h3>
          <div className="card-list">
            <div className="card-item">
               {/* Icon text MUST be the English keyword for the font */}
              <span className="m-icon">clear_day</span> {/* Keep "clear_day" */}
              <div>
                <p className="label-1">{t('highlights.sunriseSunset.sunriseLabel')}</p>
                <p className="title-1">{getTime(sunriseUnixUTC, timezone, i18n.language)}</p>
              </div>
            </div>
            <div className="card-item">
               {/* Icon text MUST be the English keyword for the font */}
              <span className="m-icon">clear_night</span> {/* Keep "clear_night" */}
              <div>
                <p className="label-1">{t('highlights.sunriseSunset.sunsetLabel')}</p>
                <p className="title-1">{getTime(sunsetUnixUTC, timezone, i18n.language)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Humidity Card */}
        <div className="card card-sm highlight-card">
          <h3 className="title-3">{t('highlights.humidity.title')}</h3>
          <div className="wrapper">
             {/* Icon text MUST be the English keyword for the font */}
            <span className="m-icon">humidity_percentage</span> {/* Keep "humidity_percentage" */}
            <p className="title-1">{t('highlights.humidity.unit', { value: humidity })}</p>
          </div>
        </div>

        {/* Pressure Card */}
        <div className="card card-sm highlight-card">
          <h3 className="title-3">{t('highlights.pressure.title')}</h3>
          <div className="wrapper">
             {/* Icon text MUST be the English keyword for the font */}
            <span className="m-icon">airwave</span> {/* Keep "airwave" */}
            <p className="title-1">{t('highlights.pressure.unit', { value: pressure })}</p>
          </div>
        </div>

        {/* Visibility Card */}
        <div className="card card-sm highlight-card">
          <h3 className="title-3">{t('highlights.visibility.title')}</h3>
          <div className="wrapper">
             {/* Icon text MUST be the English keyword for the font */}
            <span className="m-icon">visibility</span> {/* Keep "visibility" */}
            <p className="title-1">{t('highlights.visibility.unit', { value: visibility / 1000 })}</p>
          </div>
        </div>

        {/* Feels Like Card */}
        <div className="card card-sm highlight-card">
          <h3 className="title-3">{t('highlights.feelsLike.title')}</h3>
          <div className="wrapper">
             {/* Icon text MUST be the English keyword for the font */}
            <span className="m-icon">thermostat</span> {/* Keep "thermostat" */}
            <p className="title-1">{t('highlights.feelsLike.unit', { value: parseInt(feels_like) })}</p>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Highlights;