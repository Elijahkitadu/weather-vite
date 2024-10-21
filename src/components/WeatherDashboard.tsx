// src/components/WeatherDashboard.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Card, CardContent, Typography, Grid, TextField, Button } from '@mui/material';

const WeatherDashboard: React.FC = () => {
  const [cityname, setCityname] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);

  const API_KEY = '1d8e3e61bd8e8ab9c541a0ab8bf45d94';
  const CURRENT_WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast?q=';

  const getWeather = async (e: React.FormEvent) => {
    e.preventDefault(); 
    if (!cityname) return;

    try {
      const currentWeatherResponse = await axios.get(`${CURRENT_WEATHER_URL}${cityname}&appid=${API_KEY}&units=metric`);
      const forecastResponse = await axios.get(`${FORECAST_URL}${cityname}&appid=${API_KEY}&units=metric`);
      
      setWeather(currentWeatherResponse.data);
      setForecast(forecastResponse.data.list);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <Container maxWidth="lg" style={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Weather Dashboard
      </Typography>
      
      <form onSubmit={getWeather} style={{ marginBottom: '20px', textAlign: 'center' }}>
        <TextField
          label="Enter City"
          variant="outlined"
          value={cityname || ''}
          onChange={(e) => setCityname(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <Button type="submit" variant="contained" color="primary">
          Get Weather
        </Button>
      </form>

      {weather && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h5">{weather.name}, {weather.sys.country}</Typography>
                <Typography variant="h6">Temperature: {weather.main.temp}°C</Typography>
                <Typography>Feels Like: {weather.main.feels_like}°C</Typography>
                <Typography>Max Temp: {weather.main.temp_max}°C</Typography>
                <Typography>Min Temp: {weather.main.temp_min}°C</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="h6">Wind Speed: {weather.wind.speed} m/s</Typography>
                <Typography>Wind Direction: {weather.wind.deg}°</Typography>
                <Typography>Humidity: {weather.main.humidity}%</Typography>
                <Typography>Pressure: {weather.main.pressure} hPa</Typography>
                <Typography>Cloudiness: {weather.clouds.all}%</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {forecast.length > 0 && (
        <div>
          <Typography variant="h5" component="h2" gutterBottom style={{ marginTop: '20px' }}>
            5-Day Forecast
          </Typography>
          <Grid container spacing={3}>
            {forecast.slice(0, 5).map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card elevation={2}>
                  <CardContent>
                    <Typography>Date: {new Date(item.dt * 1000).toLocaleDateString()}</Typography>
                    <Typography>Temperature: {item.main.temp}°C</Typography>
                    <Typography>Humidity: {item.main.humidity}%</Typography>
                    <Typography>Weather: {item.weather[0].description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
      )}
    </Container>
  );
};

export default WeatherDashboard;
