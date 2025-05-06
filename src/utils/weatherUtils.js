/**
 * @license MIT
 * @fileoverview All module functions
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

'use strict';

const getCurrentLocale = () => {
  // i18n instance is available globally after import and init
  // This might require a slight adjustment or passing locale from component
  // A cleaner way is to pass the locale or use a hook if used in a component context.
  // For pure utility, we might need to import i18n directly, but this can be tricky
  // if the utility is imported before i18n is fully initialized.
  // A better approach: Pass the locale string to these functions.
  // Let's assume functions receive a 'locale' string argument now.
  // For simple utility functions, we might stick to t() if imported,
  // but for formatting dates/times, Intl is better.

  // Let's update these functions to accept locale. The components using them
  // will get the locale from useTranslation() and pass it.
  // Or, alternatively, we can import the i18n instance here if absolutely needed,
  // though passing the locale from the component is the standard React way.

  // Let's adjust functions to accept locale and use Intl.
};

export const weekDayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];

/**
 * @param {number} dateUnix Unix date in seconds
 * @param {number} timezone Timezone shift from UTC in seconds
 * @param {string} locale Current locale string (e.g., 'en', 'vi')
 * @returns {string} Date String. formate: "Sunday 10, Jan" (localized)
 */
export const getDate = function (dateUnix, timezone, locale) {
  const date = new Date((dateUnix + timezone) * 1000);
  // Use Intl.DateTimeFormat for localization
  const options = { weekday: 'long', day: 'numeric', month: 'short' };
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * @param {number} timeUnix Unix date in seconds
 * @param {number} timezone Timezone shift from UTC in seconds
 * @param {string} locale Current locale string (e.g., 'en', 'vi')
 * @returns {string} Time string. formate: "HH:MM AM/PM" (localized)
 */
export const getTime = function (timeUnix, timezone, locale) {
  const date = new Date((timeUnix + timezone) * 1000);
   // Use Intl.DateTimeFormat for localization
   const options = { hour: 'numeric', minute: '2-digit', hour12: true }; // Adjust hour12 based on preference or add logic
   return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * @param {number} timeUnix Unix date in seconds
 * @param {number} timezone Timezone shift from UTC in seconds
 * @param {string} locale Current locale string (e.g., 'en', 'vi')
 * @returns {string} Time string. formate: "HH AM/PM" (localized)
 */
export const getHours = function (timeUnix, timezone, locale) {
  const date = new Date((timeUnix + timezone) * 1000);
  // Use Intl.DateTimeFormat for localization
  const options = { hour: 'numeric', hour12: true }; // Adjust hour12 based on preference or add logic
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * @param {number} mps Metter per seconds
 * @returns {number} Kilometer per hours
 */
export const mps_to_kmh = mps => {
  const mph = mps * 3600;
  return mph / 1000;
}

export const aqiText = {
  1: {
    level: "Good",
    message: "Air quality is considered satisfactory, and air pollution poses little or no risk"
  },
  2: {
    level: "Fair",
    message: "Air quality is acceptable; however, for some pollutants there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution."
  },
  3: {
    level: "Moderate",
    message: "Members of sensitive groups may experience health effects. The general public is not likely to be affected."
  },
  4: {
    level: "Poor",
    message: "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects"
  },
  5: {
    level: "Very Poor",
    message: "Health warnings of emergency conditions. The entire population is more likely to be affected."
  }
}