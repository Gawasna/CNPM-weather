import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import LoadingSpinner from './LoadingSpinner';
import ErrorPage from './ErrorPage';

// Import the weather display components
import CurrentWeather from './CurrentWeather';
import Highlights from './Highlights';
import HourlyForecast from './HourlyForecast';
import Forecast5Days from './Forecast5Days';

import { fetchData, url } from '../utils/api';
import { DEFAULT_LOCATION } from '../App';
import { useTranslation } from 'react-i18next'; // Import useTranslation


function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  // State variables to hold fetched data
  const [weatherData, setWeatherData] = useState(null);
  const [highlightData, setHighlightData] = useState(null);
  const [hourlyData, setHourlyData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentLocationBtnDisabled, setCurrentLocationBtnDisabled] = useState(false);

  const { t } = useTranslation(); // Use the hook

  // Effect to fetch weather data whenever the hash changes
  useEffect(() => {
    const fetchWeatherForLocation = async (lat, lon) => {
      setIsLoading(true);
      setError(null);

      setWeatherData(null); // Clear previous data immediately
      setHighlightData(null);
      setHourlyData(null);
      setForecastData(null);

      try {
        const [current, pollution, forecast, locationInfo] = await Promise.all([
          fetchData(url.currentWeather(lat, lon)),
          fetchData(url.airPollution(lat, lon)),
          fetchData(url.forecast(lat, lon)),
          fetchData(url.reverseGeo(lat, lon)).then(data => data[0] || {}) // Handle case where reverse geo might return empty array
        ]);

        setWeatherData({ ...current, locationInfo });
        setHighlightData(pollution);
        setHourlyData(forecast);
        setForecastData(forecast);

      } catch (err) {
        console.error("Failed to fetch weather data:", err);
        // Use translated error message
        setError(err.message || t('errorPage.dataErrorMessage')); // Use error message from fetchData or fallback
      } finally {
        setIsLoading(false);
      }
    };

    const hash = location.hash;

    if (hash === '#/current-location') {
      setCurrentLocationBtnDisabled(true);
      setIsLoading(true); // Keep loading true while waiting for geolocation
      setError(null); // Clear previous errors

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Navigate to the weather route with the obtained coordinates
          // Use replace: true to avoid adding /#/current-location to history
          navigate(`#/weather?lat=${latitude}&lon=${longitude}`, { replace: true });
           // setCurrentLocationBtnDisabled will be handled by the effect re-running for the new hash
        },
        (err) => {
          console.error("Geolocation failed:", err);
          // If geolocation fails, navigate to the default location
          navigate(`#/weather?lat=${DEFAULT_LOCATION.lat}&lon=${DEFAULT_LOCATION.lon}`, { replace: true });
          // Use translated message for geolocation error
          setError(t('geolocation.permissionDeniedMessage'));
          // setCurrentLocationBtnDisabled will be handled by the effect re-running for the new hash
        }
      );
    } else if (hash.startsWith('#/weather?')) {
      setCurrentLocationBtnDisabled(false); // Enable button if on a specific location page
      const params = new URLSearchParams(hash.substring('#/weather?'.length));
      const lat = params.get('lat');
      const lon = params.get('lon');

      if (lat && lon) {
        fetchWeatherForLocation(lat, lon);
      } else {
        // If the hash is invalid, navigate to the default location
        console.warn("Invalid weather hash, navigating to default.");
        navigate(`#/weather?lat=${DEFAULT_LOCATION.lat}&lon=${DEFAULT_LOCATION.lon}`, { replace: true });
      }
    } else {
      // If the hash is neither known route, navigate to default starting point
      console.warn(`Unknown hash route: ${hash}, navigating to current location.`);
      navigate(`#/current-location`, { replace: true });
    }

    // Cleanup function if needed (e.g., to clear ongoing geolocation watches)
    // return () => { /* cleanup */ };

  }, [location.hash, navigate, t]); // Added 't' as a dependency because error message relies on it


  // Render the ErrorPage if there is an error and not loading
  if (error && !isLoading) {
      return <ErrorPage message={error} />;
  }

  // Main layout structure
  return (
    <>
      {/* Pass the disabled state to the Header */}
      <Header currentLocationBtnDisabled={currentLocationBtnDisabled} />

      {/* WRAP THE ARTICLE WITH MAIN */}
      <main>
        {/* The main content container */}
        {/* Apply fade-in class when data is loaded */}
        <article className={`container ${!isLoading && weatherData ? 'fade-in' : ''}`} data-container>

          {/* Show loading spinner if loading */}
          {isLoading && <LoadingSpinner />}

          {/* Render weather sections only when data is fully loaded and no error */}
          {/* Check if all required data pieces are available */}
          {!isLoading && weatherData && highlightData && hourlyData && forecastData ? (
            <>
              {/* Content Left Column */}
              <div className="content-left">
                  {/* Render weather components, passing their respective data */}
                  <CurrentWeather weatherData={weatherData} />
                  <Forecast5Days forecastData={forecastData} />
              </div>

              {/* Content Right Column */}
              <div className="content-right">
                  {/* Highlights needs data from both pollution and current weather */}
                  <Highlights highlightData={highlightData} currentWeatherData={weatherData} />
                  <HourlyForecast hourlyData={hourlyData} />
                  {/* Footer is part of the content-right in the original HTML */}
                  <Footer />
              </div>
            </>
          ) : (
             // Render a fallback message if not loading, no error, and no data
             // This will be shown only if isLoading is false and there's no error, but data is still null.
             // It acts as a final fallback state.
             !isLoading && !error && (
               <div style={{ textAlign: 'center', padding: '40px' }}>
                  {/* Use translated fallback message */}
                  <p className="body-1">{t('geolocation.fallbackMessage')}</p>
               </div>
             )
          )}
        </article>
      </main>

       {/* The ErrorPage is rendered separately, controlled by the top-level 'error' state */}
    </>
  );
}

export default Layout;