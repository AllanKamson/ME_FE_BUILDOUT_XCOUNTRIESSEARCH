import React, { useState, useEffect } from 'react';


const API_ENDPOINT = `https://countries-search-data-prod-812920491762.asia-south1.run.app/countries`;

const Styles = () => {
  const css = `
    /* General Body Styles */
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background-color: #f4f7f6;
      color: #333;
      margin: 0;
      padding: 0;
    }

    /* Main App Container */
    .App {
      text-align: center;
    }

    /* Main Container for the page content */
    .container {
    //   width: 100%;
    //   height: 100%;
      max-width: 100vw;
      margin: 0 auto;
      padding: 20px;
    }

    /* Header Styles */
    .header {
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      margin-bottom: 10px;
    }

    .header h1 {
      margin: 0 0 15px 0;
      color: #2c3e50;
    }

    /* Search Input Styles */
    .search-container {
      display: flex;
      justify-content: center;
    }

    .search-input {
      color: #333;
      background-color: white;
      width: 80%;
      max-width: 800px;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 16px;
      transition: all 0.3s ease-in-out;
      outline: none;
    }

    .search-input:focus {
      border-color: #4A90E2;
      box-shadow: 0 0 8px rgba(74, 144, 226, 0.2);
    }

    /* Grid for Country Cards */
    .countries-grid {
    //   width: 100vw;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      align-items: center;
    }

    /* Country Card Styles */
    .countryCard {
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      width: 200px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
      text-align: center;
    }

    .countryCard:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
    }

    /* Country Flag Image */
    .country-flag {
      width: 100px;
      height: 60px;
      object-fit: contain;
      border: 1px solid #eee;
      border-radius: 4px;
      margin-bottom: 15px;
    }

    /* Country Name */
    .country-name {
      font-size: 16px;
      font-weight: 500;
      color: #34495e;
      margin: 0;
    }

    /* Error Message */
    .error-message {
        color: #e74c3c;
        font-size: 18px;
    }
  `;
  return <style>{css}</style>;
};

const Search = ({ searchTerm, onSearch }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for countries..."
        value={searchTerm}
        onChange={onSearch}
        className="search-input"
      />
    </div>
  );
};

const CountryCard = ({ country }) => {
  return (
    <div className="countryCard">
      <img
        src={country.png}
        alt={`Flag of ${country.common}`}
        className="country-flag"
      />
      <h2 className="country-name">{country.common}</h2>
    </div>
  );
};

const Header = ({ searchTerm, onSearch }) => {
  return (
    <header className="header">
      <Search searchTerm={searchTerm} onSearch={onSearch} />
    </header>
  );
};

const CountryList = ({ filteredCountries, loading, error, searchTerm }) => {
  return (
    <main className="countries-grid">
      {loading && <p>Loading countries...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && filteredCountries.length > 0 && (
        filteredCountries.map(country => (
          <CountryCard key={country.common} country={country} />
        ))
      )}
      {!loading && !error && filteredCountries.length === 0 && searchTerm && (
          <p>No countries found matching your search.</p>
      )}
      {!loading && !error && filteredCountries.length === 0 && !searchTerm && (
          <p>No countries available to display.</p>
      )}
    </main>
  );
};

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCountries(data);
      } catch (e) {
        console.error("Error fetching data: ", e);
        setError("Failed to fetch country data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter(country =>
    country && country.common && country.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <Styles />
      <Header searchTerm={searchTerm} onSearch={handleSearchChange} />
      <CountryList
        filteredCountries={filteredCountries}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
      />
    </div>
  );
};

export default Countries;
