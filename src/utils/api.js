/**
 * @license MIT
 * @fileoverview All api related stuff like api_key, api request etc.
 * @copyright codewithsadee 2023 All rights reserved
 * @author codewithsadee <mohammadsadee24@gmail.com>
 */

'use strict';

// Read API key from environment variables exposed by Vite
const api_key = import.meta.env.VITE_API_KEY;

/**
 * Fetch data from server
 * @param {string} URL API url
 * @returns {Promise<Object>} A promise that resolves with the JSON data
 */
export const fetchData = async function (URL) {
  try {
    const response = await fetch(`${URL}&appid=${api_key}`);
    if (!response.ok) {
        // Basic error handling for non-200 responses
        // OpenWeatherMap returns 400 for invalid city search sometimes
        // And 404 for other resource issues
        // Let's check status specifically
        if (response.status === 400 || response.status === 404) {
             const errorData = await response.json(); // Try to read error message from API
             throw new Error(errorData.message || `Location data not found or invalid request (${response.status})`);
        }
        if (response.status === 401) throw new Error('Invalid API key');
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetching data failed:", error);
    throw error; // Re-throw to be caught by component's error handling
  }
}

export const url = {
  currentWeather(lat, lon) {
    // Change http:// to https://
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`
  },
  forecast(lat, lon) {
    // Change http:// to https://
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric`
  },
  airPollution(lat, lon) {
    // Change http:// to https://
    // Note: Some OpenWeatherMap APIs might have different protocols,
    // but the standard ones for /data/2.5 and /geo/1.0 should support HTTPS.
    return `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}`
  },
  reverseGeo(lat, lon) {
    // Change http:// to https://
    return `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=5`
  },
  /**
   * @param {string} query Search query e.g.: "London", "New York"
   */
  geo(query) {
    // Change http:// to https://
    return `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`
  }
}