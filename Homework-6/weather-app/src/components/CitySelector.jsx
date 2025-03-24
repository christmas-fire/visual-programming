import React, { useState } from 'react';

function CitySelector({ onCityChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCityChange(inputValue);
  };

  return (
    <form onSubmit={handleSubmit} className="city-selector">
      <input
        type="text"
        placeholder="Input your city"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default CitySelector;