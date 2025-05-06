import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSwitcher.css'; // Import CSS

function LanguageSwitcher() {
  // Use the hook to access i18n instance and translation function
  const { i18n, t } = useTranslation();

  // Function to change the language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Get the list of languages you want to display buttons for
  // You can hardcode this or get it from i18n.options.supportedLngs if defined
  const supportedLanguages = ['en', 'vi'];

  return (
    <div className="language-switcher">
      {supportedLanguages.map(lang => (
          <button
            key={lang} // Add key for list items
            onClick={() => changeLanguage(lang)}
            disabled={i18n.language === lang} // Disable the button for the current language
            className={i18n.language === lang ? 'active' : ''} // Add 'active' class for styling
          >
            {/* Use translation for the language name displayed on the button */}
             {/* Fallback to uppercase code if translation key not found */}
            {t(`languageSwitcher.${lang}`, { defaultValue: lang.toUpperCase() })}
          </button>
      ))}
    </div>
  );
}

export default LanguageSwitcher;