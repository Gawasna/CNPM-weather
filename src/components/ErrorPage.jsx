import React from 'react';
import { Link } from 'react-router-dom';
import { DEFAULT_LOCATION } from '../App';
import { useTranslation } from 'react-i18next'; // Import useTranslation

function ErrorPage({ message }) { // message prop might come from Layout error state
  const { t } = useTranslation(); // Use the hook

  // Use the message prop if provided (e.g., API error), otherwise use the default 404 message from translation
  const displayMessage = message || t('errorPage.pageNotFoundMessage');

  // Construct the default location path
  const defaultHomePath = `#/weather?lat=${DEFAULT_LOCATION.lat}&lon=${DEFAULT_LOCATION.lon}`;

  return (
    <section className="error-content" data-error-content style={{ display: 'flex' }}>
      {/* Use t() for title */}
      <h2 className="heading">{t('errorPage.title')}</h2>
      {/* Display the message */}
      <p className="body-1">{displayMessage}</p>
      <Link to={defaultHomePath} className="btn-primary">
        {/* Use t() for button text */}
        <span className="span">{t('errorPage.goHome')}</span>
      </Link>
    </section>
  );
}

export default ErrorPage;