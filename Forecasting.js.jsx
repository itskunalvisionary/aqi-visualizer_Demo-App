import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { forecastingnext } from '../data/aqiData';
import { getAQICategory, getAQIColorClass } from './AQIUtils';

export default function Forecasting({ city }) {
  const [forecastData, setForecastData] = useState([]);
  const cityName = city?.name || 'Agartala';

  useEffect(() => {
    const cityTrend = forecastingnext[cityName] || [];
    const last7Days = cityTrend
      .filter((n) => typeof n === 'number' && !isNaN(n))
      .slice(-7);

    if (last7Days.length < 7) {
      console.warn(`Insufficient data for ${cityName}`);
      setForecastData([]);
      return;
    }

    // Simple Moving Average (SMA)
    const sma =
      last7Days.reduce((sum, val) => sum + val, 0) / last7Days.length;

    const labels = ['Tomorrow', 'Day 2', 'Day 3'];
    const forecast = labels.map((label, i) => ({
      name: label,
      AQI: Math.round(sma * (1 + (i * 0.1))) // Add slight increase for demo
    }));

    setForecastData(forecast);
  }, [cityName]);

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white" style={{ fontFamily: '-apple-system, SF Pro Display' }}>AQI Forecast</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: '-apple-system, SF Pro Text' }}>Next 3 days for {cityName}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
          <span className="text-xs" style={{ fontFamily: '-apple-system, SF Pro Text' }}>Updated today</span>
        </div>
      </div>

      <div className="w-full h-64 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 p-4 mb-5">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" strokeOpacity={0.5} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12, fontFamily: '-apple-system, SF Pro Text' }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6B7280', fontSize: 12, fontFamily: '-apple-system, SF Pro Text' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: 8,
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                fontFamily: '-apple-system, SF Pro Text'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="AQI" 
              stroke="#10B981" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#FFFFFF' }} 
              activeDot={{ r: 6, stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {forecastData.map((day, i) => (
          <div key={i} className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-100 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-3">
                <span className="text-lg">📅</span>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white" style={{ fontFamily: '-apple-system, SF Pro Display' }}>{day.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400" style={{ fontFamily: '-apple-system, SF Pro Text' }}>
                  {getAQICategory(day.AQI)} air quality
                </p>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full ${getAQIColorClass(day.AQI)}`}>
              <p className="text-sm font-medium text-white" style={{ fontFamily: '-apple-system, SF Pro Text' }}>{day.AQI}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}