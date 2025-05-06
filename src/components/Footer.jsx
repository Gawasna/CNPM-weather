import React from 'react';

function Footer() {
  return (
    // The footer display is controlled by the `fade-in` class on the main article.container in Layout.jsx
    // and the CSS rule `.fade-in .footer { display: flex; }`
    <footer className="footer">
      <p className="body-3">
        Copyright 2023 codewithsadee. All Rights Reserved.
      </p>
      <p className="body-3">
        Powered By <a href="https://openweathermap.org/api" title="Free OpenWeather Api" target="_blank"
          rel="noopener">
          <img src="/assets/images/openweather.png" width="150" height="30" loading="lazy" alt="OpenWeather" />
        </a>
      </p>
    </footer>
  );
}

export default Footer;