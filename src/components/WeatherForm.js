import React, { useState } from 'react';
import { TextField, Button, Box, Alert } from '@mui/material';
import axios from 'axios';

const WeatherForm = ({ onSubmit, apiKey }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      console.log('Attempting to fetch weather data...');
      const response = await axios.get(url);

      onSubmit({
        city: response.data.name,
        temperature: response.data.main.temp,
        humidity: response.data.main.humidity,
        description: response.data.weather[0].description,
        timestamp: new Date().toLocaleString()
      });

      setCity('');
    } catch (err) {
      console.error('API Error:', err.response ? err.response.data : err.message);
      if (err.response && err.response.status === 401) {
        setError(
          'API key is not yet activated. OpenWeatherMap API keys typically take up to 2 hours to activate after creation. ' +
          'Please wait a while and try again later.'
        );
      } else if (err.response && err.response.data.message) {
        setError(`API Error: ${err.response.data.message}`);
      } else if (err.response && err.response.status === 404) {
        setError('City not found. Please check the city name.');
      } else {
        setError('Error fetching weather data. Please try again.');
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Enter City Name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        required
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Get Weather
      </Button>
      {error && <Alert severity="error">{error}</Alert>}
    </Box>
  );
};

export default WeatherForm;
