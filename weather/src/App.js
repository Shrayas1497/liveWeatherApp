import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css'



const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
  
    const fetchWeatherData = async (latitude, longitude) => {
      try {
        const response = await axios.post('http://localhost:5000/api/weather', { latitude, longitude });
        setWeatherData(response.data);
      } catch (error) {
        setErrorMessage('Error fetching weather data. Please try again later.');
      }
    };

    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherData(latitude, longitude);
        },
        () => {
          setErrorMessage('Unable to retrieve your location. Please enable location services.');
        }
      );
    };

    getLocation();
  }, []);

  return (
    <div className="App">
      {/* Display weather data */}
      {weatherData && (
        <div class="main-div">
          
          

        

          <h1 className='location'>{weatherData.location}</h1>
          <h1 className='temperature'> {weatherData.temperature}°C</h1>
          <p className='condition'>Conditions: {weatherData.conditions}</p>
          {weatherData.temperature > 25 ?
           <p className='hot'> Hot!</p>
          
            : <p className='not-hot'>Not-too hot!</p>}
        </div>
      )}

    
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default App;
