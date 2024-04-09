import React, { useState, useEffect } from 'react';
import './home.css';
import axios from 'axios';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (latitude, longitude ) => {
      try {
        const response =  await axios.get('http://localhost:5000/api/weather', { latitude, longitude });
        
        if (response.status === 200) {
          setWeatherData(response.data);
        } else {
          setError(`Error: ${response.status} - ${response.statusText}`);
        }
      } catch (error) {
        setError(`Error fetching weather data: ${error.message}`);
      }
    };

    fetchWeather();
  }, []);

  return (
    <div>
      <h2>Weather Data from API</h2>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <p>Location: {weatherData.location}</p>
          <p>Temperature: {weatherData.temperature}</p>
          <p>Conditions: {weatherData.conditions}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
