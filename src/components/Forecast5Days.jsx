import React from 'react';
import { weekDayNames, monthNames } from '../utils/weatherUtils'; // Import utility arrays

function Forecast5Days({ forecastData }) {
   // Don't render if data is not available
   if (!forecastData) return null;

   const { list: forecastList } = forecastData; // No need for timezone here as dt_txt is ISO format

   // Filter for daily forecast (every 8th item represents a new day's general forecast)
   const dailyItems = forecastList.filter((item, index) => index % 8 === 7);

   return (
       <section className="section forecast" aria-labelledby="forecast-label" data-5-day-forecast>
           <h2 className="title-2" id="forecast-label">5 Days Forecast</h2>

           <div className="card card-lg forecast-card">
               <ul data-forecast-list>
                   {dailyItems.map((item, index) => {
                       const { main: { temp_max }, weather, dt_txt } = item;
                       const [{ icon, description }] = weather;
                       const date = new Date(dt_txt); // dt_txt is already in a parseable format

                       // Get day name and month name directly from Date object and utility arrays
                       const dayName = weekDayNames[date.getUTCDay()];
                       const monthName = monthNames[date.getUTCMonth()];
                       const dayOfMonth = date.getUTCDate();


                       return (
                           <li key={index} className="card-item"> {/* Add key */}
                               <div className="icon-wrapper">
                                   {/* Image path relative to public directory */}
                                   <img src={`/assets/images/weather_icons/${icon}.png`} width="36" height="36" alt={description}
                                       className="weather-icon" title={description} />
                                   <span className="span">
                                       <p className="title-2">{parseInt(temp_max)}°</p>
                                   </span>
                               </div>
                               {/* Format date */}
                               <p className="label-1">{dayOfMonth} {monthName}</p>
                               {/* Display weekday name */}
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