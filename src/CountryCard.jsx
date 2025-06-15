import React from 'react';

// Props:
// - country: An object containing country data (e.g., { name: '...', flag: '...' }).
const CountryCard = ({ country }) => {
  return (
    <div className="countryCard">
      <img src={country.flag} alt={`Flag of ${country.name}`} className="country-flag" />
      <h2 className="country-name">{country.name}</h2>
    </div>
  );
};

export default CountryCard;