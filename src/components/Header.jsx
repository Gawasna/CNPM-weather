import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchData, url } from '../utils/api';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

function Header({ currentLocationBtnDisabled }) {
  const [searchViewActive, setSearchViewActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();
  const searchInputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  const { t } = useTranslation();

  const toggleSearch = () => {
    setSearchViewActive(!searchViewActive);
    if (!searchViewActive) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
       setSearchValue('');
       setSearchResults([]);
       setIsSearching(false);
    }
  };

  useEffect(() => {
    if (!searchValue) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    setIsSearching(true);

    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const locations = await fetchData(url.geo(searchValue));
        setSearchResults(locations);
      } catch (error) {
        console.error("Search API call failed:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };

  }, [searchValue]);


  return (
    <header className="header">
      <div className="container">
        <Link to="/current-location" className="logo" onClick={() => setSearchViewActive(false)}>
          <img src="/assets/images/logo.png" width="364" height="58" alt={t('header.logoAlt')} />
        </Link>

        <div className={`search-view ${searchViewActive ? 'active' : ''}`} data-search-view>
          <div className={`search-wrapper ${isSearching ? 'searching' : ''}`}>
             <button className="icon-btn leading-icon has-state" aria-label={t('header.closeSearch')} onClick={toggleSearch} data-search-toggler>
               {/* Icon text MUST be the English keyword for the font */}
               <span className="m-icon">arrow_back</span> {/* Keep "arrow_back" */}
             </button>
             <input
               type="search"
               name="search"
               placeholder={t('header.searchPlaceholder')}
               autocomplete="off"
               className="search-field"
               data-search-field
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
               ref={searchInputRef}
             />
          </div>

          <div className={`search-result ${searchResults.length > 0 || (!isSearching && searchValue && searchResults.length === 0) ? 'active' : ''}`} data-search-result>
             <ul className="view-list" data-search-list>
               {searchResults.map((location, index) => (
                 <li key={index} className="view-item">
                   <Link
                       to={`#/weather?lat=${location.lat}&lon=${location.lon}`}
                       className="item-link has-state"
                       aria-label={`${location.name} ${t('currentWeather.weatherLabel', { defaultValue: 'weather' })}`}
                       onClick={toggleSearch}
                   >
                       {/* Icon text MUST be the English keyword for the font */}
                       <span className="m-icon">location_on</span> {/* Keep "location_on" */}
                       <div>
                         <p className="item-title">{location.name}</p>
                         <p className="label-2 item-subtitle">{location.state ? `${location.state}, ` : ''}{location.country}</p>
                       </div>
                   </Link>
                 </li>
               ))}
             </ul>
             {!isSearching && searchValue && searchResults.length === 0 && (
                 <div className="view-item">
                    <p className="body-3">{t('header.noResultsFound', { query: searchValue })}</p>
                 </div>
             )}
          </div>
        </div>

        <div className="header-actions">
          <button className="icon-btn has-state" aria-label={t('header.openSearch')} onClick={toggleSearch} data-search-toggler>
            {/* Icon text MUST be the English keyword for the font */}
            <span className="m-icon icon">search</span> {/* Keep "search" */}
          </button>
          <LanguageSwitcher />
          <Link
            to="/current-location"
            className={`btn-primary has-state ${currentLocationBtnDisabled ? 'disabled' : ''}`}
            data-current-location-btn
            onClick={(e) => {
               if (currentLocationBtnDisabled) {
                  e.preventDefault();
               } else {
                  setSearchViewActive(false);
               }
            }}
          >
            {/* Icon text MUST be the English keyword for the font */}
            <span className="m-icon">my_location</span> {/* Keep "my_location" */}
            <span className="span">{t('header.currentLocationBtn')}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;