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
          fetchData(url.reverseGeo(lat, lon)).then(data => data[0])
        ]);

        setWeatherData({ ...current, locationInfo });
        setHighlightData(pollution);
        setHourlyData(forecast);
        setForecastData(forecast);

      } catch (err) {
        console.error("Failed to fetch weather data:", err);
        setError("Could not load weather data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    const hash = location.hash;

    if (hash === '#/current-location') {
      setCurrentLocationBtnDisabled(true);
      setIsLoading(true);
      setError(null);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          navigate(`#/weather?lat=${latitude}&lon=${longitude}`, { replace: true });
          // setCurrentLocationBtnDisabled(false); // This will be re-enabled by the next hashchange effect
        },
        (err) => {
          console.error("Geolocation failed:", err);
          navigate(`#/weather?lat=${DEFAULT_LOCATION.lat}&lon=${DEFAULT_LOCATION.lon}`, { replace: true });
          setError("Could not retrieve current location. Showing data for the default location.");
          // setCurrentLocationBtnDisabled(false); // This will be re-enabled by the next hashchange effect
        }
      );
    } else if (hash.startsWith('#/weather?')) {
      setCurrentLocationBtnDisabled(false);
      const params = new URLSearchParams(hash.substring('#/weather?'.length));
      const lat = params.get('lat');
      const lon = params.get('lon');

      if (lat && lon) {
        fetchWeatherForLocation(lat, lon);
      } else {
        navigate(`#/weather?lat=${DEFAULT_LOCATION.lat}&lon=${DEFAULT_LOCATION.lon}`, { replace: true });
      }
    } else {
      // Fallback for unexpected hash
      navigate(`#/current-location`, { replace: true });
    }

  }, [location.hash, navigate]); // Effect dependencies

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
      <main> {/* Added the main tag back */}
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
             // Optional: Render a fallback message if not loading, no error, and no data
             !isLoading && !error && (
               <div style={{ textAlign: 'center', padding: '40px' }}>
                  <p className="body-1">Select a location or enable geolocation.</p>
               </div>
             )
          )}
        </article>
      </main> {/* Closed the main tag */}

       {/* The ErrorPage is rendered separately, controlled by the top-level 'error' state */}
    </>
  );
}

export default Layout;