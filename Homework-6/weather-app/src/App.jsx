import React, { useState, useEffect, useCallback } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import CitySelector from './components/CitySelector';
import './App.css';

const API_KEY = '6094043f9c303b397d7b841afa366a9a'; // Замените на ваш API-ключ
const GEOCODING_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

function App() {
  const [city, setCity] = useState('Moscow');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Получение координат города
  const fetchCoordinates = useCallback(async (cityName) => {
    try {
      const response = await fetch(
        `${GEOCODING_URL}?q=${cityName}&appid=${API_KEY}`
      );
      if (!response.ok) throw new Error('Ошибка при получении координат');
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        fetchWeather(lat, lon);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }, []);

  // Получение прогноза погоды
  const fetchWeather = useCallback(async (lat, lon) => {
    try {
      const response = await fetch(
        `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error('Ошибка при получении погоды');
      const data = await response.json();

      // Агрегация данных по дням
      const dailyForecast = aggregateForecast(data.list);
      setWeatherData(dailyForecast);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }, []);

  // Агрегация данных по дням
  const aggregateForecast = (forecastList) => {
    const dailyData = {};
    forecastList.forEach((item) => {
      const date = item.dt_txt.split(' ')[0]; // Извлекаем дату из timestamp
      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          temp: item.main.temp,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
        };
      }
    });
    return Object.values(dailyData); // Преобразуем объект в массив
  };

  // Обновление данных каждые три часа
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCoordinates(city);
    }, 3 * 60 * 60 * 1000); // 3 часа
    return () => clearInterval(interval);
  }, [city, fetchCoordinates]);

  // Первоначальная загрузка
  useEffect(() => {
    fetchCoordinates(city);
  }, [city, fetchCoordinates]);

  return (
    <div className="container">
      <div className="app">
        <h1>Weather App</h1>
        <CitySelector onCityChange={(newCity) => setCity(newCity)} />
        {loading ? (
          <p>Загрузка...</p>
        ) : (
          <WeatherDisplay data={weatherData} />
        )}
      </div>
    </div>
  );
}

export default App;