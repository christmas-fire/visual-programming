import React, { useState, useEffect, useCallback } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import CitySelector from './components/CitySelector';
import './App.css'

const API_KEY = '6094043f9c303b397d7b841afa366a9a'; // Замените на ваш API-ключ
const GEOCODING_URL = 'https://api.openweathermap.org/geo/1.0/direct';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';

function App() {
  const [city, setCity] = useState('Moscow');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Получение координат города
  // Получение прогноза погоды
  const fetchWeather = useCallback(async (lat, lon) => {
    try {
      const response = await fetch(
        `${FORECAST_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error('Ошибка при получении погоды');
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }, []); // Нет зависимостей, так как функция не использует внешних переменных

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
  }, [fetchWeather]); // Добавляем fetchWeather в массив зависимостей


  // Обновление данных каждые три часа
  useEffect(() => {
    const interval = setInterval(() => {
      fetchCoordinates(city);
    }, 3 * 60 * 60 * 1000); // 3 часа
    return () => clearInterval(interval);
  }, [city, fetchCoordinates]); // Добавляем city и fetchCoordinates в массив зависимостей

  // Первоначальная загрузка
  useEffect(() => {
    fetchCoordinates(city);
  }, [city, fetchCoordinates]); // Добавляем city и fetchCoordinates в массив зависимостей

  return (
    <div className='container'>
        <div className="app">
            <h1>weather-app</h1>
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