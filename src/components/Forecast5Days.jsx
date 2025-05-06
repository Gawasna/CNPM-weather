import React from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation
import { getDate } from '../utils/weatherUtils'; // Use getDate which is now locale aware

function Forecast5Days({ forecastData }) {
   const { t, i18n } = useTranslation(); // Use the hook

   if (!forecastData) return null;

   const { list: forecastList } = forecastData;

   // Filter for daily forecast (every 8th item represents a new day's general forecast)
   // The index calculation might need refinement for edge cases, but matches original logic.
   const dailyItems = forecastList.filter((item, index) => index % 8 === 7);

   return (
       <section className="section forecast" aria-labelledby="forecast-label" data-5-day-forecast>
           {/* Use t() for title */}
           <h2 className="title-2" id="forecast-label">{t('forecast5Days.title')}</h2>

           <div className="card card-lg forecast-card">
               <ul data-forecast-list>
                   {dailyItems.map((item, index) => {
                       const { main: { temp_max }, weather, dt_txt } = item;
                       const [{ icon, description }] = weather;
                       const date = new Date(dt_txt); // dt_txt is already in a parseable format

                       // Use Intl.DateTimeFormat for localized day and month names
                       // Or use t() with utility keys if needed for custom format string.
                       // Using Intl is more standard for actual date/time parts.
                       // Let's get day and month names via Intl for robustness.
                       const dayName = new Intl.DateTimeFormat(i18n.language, { weekday: 'long' }).format(date);
                       const monthName = new Intl.DateTimeFormat(i18n.language, { month: 'short' }).format(date);
                       const dayOfMonth = date.getUTCDate();

                       return (
                           <li key={index} className="card-item">
                               <div className="icon-wrapper">
                                    {/* Use API description for alt/title text */}
                                   <img src={`/assets/images/weather_icons/${icon}.png`} width="36" height="36" alt={description}
                                       className="weather-icon" title={description} />
                                   <span className="span">
                                        {/* Use t() with interpolation for temperature */}
                                       <p className="title-2">{t('forecast5Days.tempUnit', { temp: parseInt(temp_max) })}</p>
                                   </span>
                               </div>
                               {/* Format date using day number and translated month name */}
                               <p className="label-1">{`${dayOfMonth} ${monthName}`}</p>
                               {/* Display translated weekday name */}
                               <p className="label-1">{dayName}</p>
                           </li>
                       );
                   })}
               </ul>
           </div>
       </section>
   );
}

export default Forecast5Days;