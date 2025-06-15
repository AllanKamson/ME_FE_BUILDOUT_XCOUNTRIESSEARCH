import React from 'react';

// Props:
// - searchTerm: The current value of the search input.
// - onSearch: A function to handle changes in the search input.
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

export default Search;