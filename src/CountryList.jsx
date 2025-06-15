import React from 'react';
import CountryCard from './CountryCard';

// Props:
// - filteredCountries: Array of country objects to display.
// - loading: Boolean indicating if data is being loaded.
// - error: String containing an error message, if any.
// - searchTerm: The current search term, used for the "no results" message.
const CountryList = ({ filteredCountries, loading, error, searchTerm }) => {
  return (
    <main className="countries-grid">
      {loading && <p>Loading countries...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && filteredCountries.length > 0 && (
        filteredCountries.map(country => (
          <CountryCard key={country.name} country={country} />
        ))
      )}
      {!loading && !error && filteredCountries.length === 0 && searchTerm && (
          <p>No countries found matching your search.</p>
      )}
    </main>
  );
};

export default CountryList;