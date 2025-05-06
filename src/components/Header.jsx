import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ensure Link and useNavigate are imported
import { fetchData, url } from '../utils/api'; // Import API utilities

function Header({ currentLocationBtnDisabled }) {
  const [searchViewActive, setSearchViewActive] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate(); // Although we use Link now, keep navigate for the default location fallback
  const searchInputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  // Toggle function for the search view overlay
  const toggleSearch = () => {
    setSearchViewActive(!searchViewActive);
    // Optional: Focus the search input when opening the view
    if (!searchViewActive) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    } else {
       // Clear input and results when closing the search view
       setSearchValue('');
       setSearchResults([]);
       setIsSearching(false); // Hide loading indicator
    }
  };

  // Effect for handling search input and fetching suggestions with debounce
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
        // Optionally handle error display
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

  // --- Removed the handleSearchResultClick function ---
  // Navigation will now be handled directly by the Link component

  return (
    <header className="header">
      <div className="container">
        {/* Logo linking to current location. Add click handler to close search if open. */}
        <Link to="/current-location" className="logo" onClick={() => setSearchViewActive(false)}>
          <img src="/assets/images/logo.png" width="364" height="58" alt="logo" />
        </Link>

        {/* Search View Overlay */}
        <div className={`search-view ${searchViewActive ? 'active' : ''}`} data-search-view>
          {/* Search Wrapper */}
          <div className={`search-wrapper ${isSearching ? 'searching' : ''}`}>
             {/* Back button to close search view */}
             <button className="icon-btn leading-icon has-state" aria-label="close search" onClick={toggleSearch} data-search-toggler>
               <span className="m-icon">arrow_back</span>
             </button>
             {/* Search Input Field */}
             <input
               type="search"
               name="search"
               placeholder="Search city..."
               autoComplete="off"
               className="search-field"
               data-search-field
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
               ref={searchInputRef}
             />
          </div>

          {/* Search Results Area */}
          <div className={`search-result ${searchResults.length > 0 || (!isSearching && searchValue && searchResults.length === 0) ? 'active' : ''}`} data-search-result>
             {/* List to display search suggestions */}
             <ul className="view-list" data-search-list>
               {/* Map over searchResults array to create list items */}
               {searchResults.map((location, index) => (
                 <li key={index} className="view-item">
                   {/* Use Link to navigate to the weather route for this location */}
                   {/* The 'has-state' class is moved to the Link to maintain hover/focus styles */}
                   <Link
                       to={`#/weather?lat=${location.lat}&lon=${location.lon}`}
                       className="item-link has-state" // Keep class names for styling
                       aria-label={`${location.name} weather`}
                       onClick={toggleSearch} // Call toggleSearch to close the view *before* navigation
                   >
                       <span className="m-icon">location_on</span>
                       <div>
                         <p className="item-title">{location.name}</p>
                         <p className="label-2 item-subtitle">{location.state ? `${location.state}, ` : ''}{location.country}</p>
                       </div>
                   </Link>
                 </li>
               ))}
             </ul>
             {/* Display message if no results found after search completes */}
             {!isSearching && searchValue && searchResults.length === 0 && (
                 <div className="view-item">
                    <p className="body-3">No results found for "{searchValue}"</p>
                 </div>
             )}
          </div>
        </div>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Button to open search view */}
          <button className="icon-btn has-state" aria-label="open search" onClick={toggleSearch} data-search-toggler>
            <span className="m-icon icon">search</span>
          </button>
          {/* Link/Button to navigate to current location weather */}
          <Link
            to="/current-location"
            className={`btn-primary has-state ${currentLocationBtnDisabled ? 'disabled' : ''}`}
            data-current-location-btn
            onClick={(e) => {
               if (currentLocationBtnDisabled) {
                  e.preventDefault();
               } else {
                  // Close search view if user clicks current location button while search is open
                  setSearchViewActive(false);
               }
            }}
          >
            <span className="m-icon">my_location</span>
            <span className="span">Current Location</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;