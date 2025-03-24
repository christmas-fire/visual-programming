import React from 'react';

function WeatherDisplay({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <div className="weather-display">
      <h2>5 days forecast</h2>
      <div className="forecast">
        {data.map((day, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(day.date).toLocaleDateString()}</p>
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
              alt={day.description}
            />
            <p>{Math.round(day.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDisplay;