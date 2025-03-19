import React from 'react';

function WeatherDisplay({ data }) {
  if (!data) return null;

  const forecastList = data.list.slice(0, 5); // Показываем прогноз на 5 ближайших временных точек

  return (
    <div className="weather-display">
      <h2>{data.city.name}</h2>
      <div className="forecast">
        {forecastList.map((item, index) => (
          <div key={index} className="forecast-item">
            <p>{new Date(item.dt * 1000).toLocaleTimeString()}</p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={item.weather[0].description}
            />
            <p>{Math.round(item.main.temp)}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WeatherDisplay;