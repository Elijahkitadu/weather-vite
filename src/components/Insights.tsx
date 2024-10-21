// src/pages/Insights.tsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Insights: React.FC = () => {
  const [forecastData, setForecastData] = useState<any[]>([]);

  const API_KEY = '1d8e3e61bd8e8ab9c541a0ab8bf45d94';
  const CITY = 'London';  // Default city, can make dynamic
  const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${CITY}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        const response = await axios.get(FORECAST_URL);
        setForecastData(response.data.list);
      } catch (error) {
        console.error('Error fetching forecast data:', error);
      }
    };

    fetchForecast();
  }, []);

  // Prepare data for charts
  const chartLabels = forecastData.map((item: any) => new Date(item.dt * 1000).toLocaleDateString());
  const tempData = forecastData.map((item: any) => item.main.temp);
  const humidityData = forecastData.map((item: any) => item.main.humidity);
  const pressureData = forecastData.map((item: any) => item.main.pressure);
  const windSpeedData = forecastData.map((item: any) => item.wind.speed);

  const weatherChartData = {
    labels: chartLabels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: tempData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Humidity (%)',
        data: humidityData,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Pressure (hPa)',
        data: pressureData,
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
      {
        label: 'Wind Speed (m/s)',
        data: windSpeedData,
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `5-Day Weather Trends for ${CITY}`,
      },
    },
  };

  return (
    <div>
      <h1>Admin Insights</h1>
      <div style={{ width: '800px', margin: '0 auto' }}>
        <Line data={weatherChartData} options={options} />
      </div>
    </div>
  );
};

export default Insights;
