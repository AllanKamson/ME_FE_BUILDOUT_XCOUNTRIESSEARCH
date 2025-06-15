import React from 'react';
import Search from './Search';

// Props:
// - searchTerm: The current value of the search input.
// - onSearch: A function to handle changes in the search input.
const Header = ({ searchTerm, onSearch }) => {
  return (
    <header className="header">
      <h1>Country Flags</h1>
      <Search searchTerm={searchTerm} onSearch={onSearch} />
    </header>
  );
};

export default Header;