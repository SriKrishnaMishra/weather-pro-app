import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import WeatherForm from './components/WeatherForm';
import WeatherList from './components/WeatherList';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [apiKey] = useState('78d92a02a9465f7ed695d45e6e86c9ab'); // OpenWeatherMap API key

  const addWeatherData = (data) => {
    setWeatherData([...weatherData, { ...data, id: Date.now() }]);
  };

  const deleteWeatherData = (id) => {
    setWeatherData(weatherData.filter(item => item.id !== id));
  };

  const updateWeatherData = (id, updatedData) => {
    setWeatherData(weatherData.map(item => 
      item.id === id ? { ...item, ...updatedData } : item
    ));
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Weather Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <WeatherForm onSubmit={addWeatherData} apiKey={apiKey} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <WeatherList 
              weatherData={weatherData}
              onDelete={deleteWeatherData}
              onUpdate={updateWeatherData}
              apiKey={apiKey}
            />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ mt: 4, textAlign: 'center', py: 2 }}>
        <Typography variant="body1" color="text.secondary">
          PMAccelerator Project
        </Typography>
      </Box>
    </Container>
  );
}

export default App;
