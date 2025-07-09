import React from 'react';
import { motion } from 'framer-motion';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CPCBAQIMap, KeyPollutants } from '../data/aqiData';
import { getAQICategory, getAQIColorClass, getHealthAdvisory, getPollutantIcon, getPollutantColorClass } from './AQIUtils';

const containerStyle = {
  width: '100%',
  height: '100%'
};

export default function HomeDashboard({ city }) {
   const centerCoordinates = {
    [city.name]: { lat: city.lat, lng: city.lng },
  };
  const currentAQI = CPCBAQIMap[city.name];

  return (
    <div className="p-5 space-y-6">
      {/* Current Location */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white" style={{ fontFamily: '-apple-system, SF Pro Display' }}>{city.name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: '-apple-system, SF Pro Text' }}>Current location</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1 flex items-center">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs" style={{ fontFamily: '-apple-system, SF Pro Text' }}>Map</span>
        </div>
      </div>

      {/* AQI Card */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: '-apple-system, SF Pro Text' }}>AIR QUALITY INDEX</p>
            <h3 className="text-4xl font-bold text-gray-900 dark:text-white" style={{ fontFamily: '-apple-system, SF Pro Display' }}>{currentAQI}</h3>
          </div>
          <motion.div
            key={getAQICategory(currentAQI)}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className={`rounded-full px-4 py-2 ${getAQIColorClass(currentAQI)}`}
          >
            <p className="text-sm font-medium text-white" style={{ fontFamily: '-apple-system, SF Pro Text' }}>
              {getAQIEmoji(currentAQI)} {getAQICategory(currentAQI)}
            </p>
          </motion.div>
        </div>

        {/* Map */}
        <div className="aspect-video w-full rounded-xl overflow-hidden mb-5">
          <LoadScript googleMapsApiKey="AIzaSyDh90G1edHOc6nJZqfJGzl0FHx_V8WoydU">
            <GoogleMap 
              mapContainerStyle={containerStyle} 
              center={centerCoordinates[city.name]} 
              zoom={12}
              options={{
                styles: [
                  {
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{ visibility: "off" }]
                  }
                ],
                disableDefaultUI: true,
                zoomControl: true
              }}
            />
          </LoadScript>
        </div>

        {/* Pollutant Levels */}
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3" style={{ fontFamily: '-apple-system, SF Pro Display' }}>Pollutant Levels</h3>
        <div className="grid grid-cols-2 gap-3">
          {(KeyPollutants[city.name] || []).length > 0 ? (
            KeyPollutants[city.name].map((p) => (
              <div key={p.name} className="bg-gray-50 dark:bg-gray-700 p-3 rounded-xl flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getPollutantColorClass(p.name)}`}>
                  <span className="text-xl">{getPollutantIcon(p.name)}</span>
                </div>
                <div>
                  <h3 className="text-sm text-gray-500 dark:text-gray-300" style={{ fontFamily: '-apple-system, SF Pro Text' }}>{p.name}</h3>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white" style={{ fontFamily: '-apple-system, SF Pro Display' }}>{p.value} µg/m³</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center col-span-2 text-gray-500 dark:text-gray-400 py-6" style={{ fontFamily: '-apple-system, SF Pro Text' }}>No pollutant data available for {city.name}</div>
          )}
        </div>
      </div>

      {/* Health Advisory */}
      <div className={`p-4 rounded-xl ${getHealthAdvisory(currentAQI).bg}`}>
        <h3 className="font-semibold mb-1 text-sm" style={{ fontFamily: '-apple-system, SF Pro Display' }}>{getHealthAdvisory(currentAQI).level}</h3>
        <p className="text-xs" style={{ fontFamily: '-apple-system, SF Pro Text' }}>{getHealthAdvisory(currentAQI).message}</p>
      </div>
    </div>
  );
}