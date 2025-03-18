import React, { useState } from 'react';

function SearchSort({ onSearch, onSort, sortField }) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    onSearch(e.target.value);
  };

  const handleSortChange = (e) => {
    onSort(e.target.value);
  };

  return (
    <div className="search-sort">
      <input 
        type="text" 
        placeholder="Search by title..." 
        value={searchValue} 
        onChange={handleSearchChange} 
      />
      <select value={sortField} onChange={handleSortChange}>
        <option value="userId">Sort by User ID</option>
        <option value="id">Sort by ID</option>
      </select>
    </div>
  );
}

export default SearchSort;