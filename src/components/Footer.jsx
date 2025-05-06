import React from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation

function Footer() {
   const { t } = useTranslation(); // Use the hook

  return (
    <footer className="footer">
      {/* Use t() for copyright text */}
      <p className="body-3">
        {t('footer.copyright')}
      </p>
      <p className="body-3">
        {/* Use t() for "Powered By" */}
        {t('footer.poweredBy')} <a href="https://openweathermap.org/api" title="Free OpenWeather Api" target="_blank"
          rel="noopener">
          {/* Keep alt as OpenWeather or translate if needed */}
          <img src="/assets/images/openweather.png" width="150" height="30" loading="lazy" alt="OpenWeather" />
        </a>
      </p>
    </footer>
  );
}

export default Footer;