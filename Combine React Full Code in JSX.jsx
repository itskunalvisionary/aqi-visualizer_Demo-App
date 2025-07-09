import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const baseCities = [
  { name: "Agartala", lat: 23.8315, lng: 91.2868 },
  { name: "Agra", lat: 27.1767, lng: 78.0081 },
  { name: "Ahmedabad", lat: 23.0225, lng: 72.5714 },
  { name: "Ahmednagar", lat: 19.0952, lng: 74.7496 },
  { name: "Aizawl", lat: 23.7271, lng: 92.7176 },
  { name: "Ajmer", lat: 26.4499, lng: 74.6399 },
  { name: "Akola", lat: 20.7096, lng: 77.0082 },
  { name: "Alwar", lat: 27.55299, lng: 76.6346 },
  { name: "Amaravati", lat: 16.5417, lng: 80.5175 },
  { name: "Amravati", lat: 20.9374, lng: 77.7796 },
  { name: "Amritsar", lat: 31.6340, lng: 74.8723 },
  { name: "Anantapur", lat: 14.6812, lng: 77.6006 },
{ name: "Ankleshwar", lat: 21.6324, lng: 72.9900 },
{ name: "Ariyalur", lat: 11.1375, lng: 79.0758 },
{ name: "Asansol", lat: 23.6739, lng: 86.9524 },
{ name: "Aurangabad (Maharashtra)", lat: 19.8762, lng: 75.3433 },
{ name: "Baddi", lat: 30.9578, lng: 76.7914 },
{ name: "Badlapur", lat: 19.1552, lng: 73.2655 },
{ name: "Bagalkot", lat: 16.1850, lng: 75.6963 },
{ name: "Baghpat", lat: 28.9500, lng: 77.2167 },
{ name: "Balasore", lat: 21.4942, lng: 86.9336 },
{ name: "Banswara", lat: 23.5466, lng: 74.4338 },
{ name: "Baran", lat: 25.1000, lng: 76.5167 },
{ name: "Barbil", lat: 22.1014, lng: 85.3775 },
{ name: "Bareilly", lat: 28.3670, lng: 79.4304 },
{ name: "Baripada", lat: 21.9333, lng: 86.7333 },
{ name: "Barmer", lat: 25.7500, lng: 71.3833 },
{ name: "Barrackpore", lat: 22.7500, lng: 88.3667 },
{ name: "Bathinda", lat: 30.2070, lng: 74.9455 },
{ name: "Belapur", lat: 19.0333, lng: 73.0333 },
{ name: "Belgaum", lat: 15.8500, lng: 74.5000 },
{ name: "Bengaluru", lat: 12.9716, lng: 77.5946 },
{ name: "Bharatpur", lat: 27.2167, lng: 77.4833 },
{ name: "Bhilai", lat: 21.2167, lng: 81.4333 },
{ name: "Bhilwara", lat: 25.3500, lng: 74.6333 },
{ name: "Bhiwadi", lat: 28.2100, lng: 76.8600 },
{ name: "Bhiwandi", lat: 19.3000, lng: 73.0667 },
{ name: "Bhopal", lat: 23.2599, lng: 77.4126 },
{ name: "Bhubaneswar", lat: 20.2644, lng: 85.8281 },
{ name: "Bikaner", lat: 28.0167, lng: 73.3167 },
{ name: "Bilaspur", lat: 22.1500, lng: 82.0167 },
{ name: "Bileipada", lat: 21.9333, lng: 85.3500 },
{ name: "Boisar", lat: 19.8000, lng: 72.7500 },
{ name: "Bulandshahr", lat: 28.4000, lng: 77.8500 },
{ name: "Bundi", lat: 25.4400, lng: 75.6400 },
{ name: "Byasanagar", lat: 20.9167, lng: 86.1167 },
{ name: "Bymihat", lat: 25.0000, lng: 93.0000 },
{ name: "Chamarajanagar", lat: 11.9333, lng: 76.9333 },
{ name: "Chandigarh", lat: 30.7333, lng: 76.7794 },
{ name: "Chandrapur", lat: 19.9500, lng: 79.3000 },
{ name: "Chengalpattu", lat: 12.6833, lng: 79.9833 },
{ name: "Chennai", lat: 13.0827, lng: 80.2707 },
{ name: "Chhai", lat: 22.8300, lng: 86.1700 },
{ name: "Chhapra", lat: 25.7833, lng: 84.7500 },
{ name: "Chikkaballapur", lat: 13.4333, lng: 77.7333 },
{ name: "Chikkamagaluru", lat: 13.3167, lng: 75.7833 },
{ name: "Chittoor", lat: 13.2000, lng: 79.1167 },
{ name: "Chittorgarh", lat: 24.8894, lng: 74.6239 },
{ name: "Churu", lat: 28.3000, lng: 74.9500 },
{ name: "Coimbatore", lat: 11.0168, lng: 76.9558 },
{ name: "Cuddalore", lat: 11.7500, lng: 79.7500 },
{ name: "Cuttack", lat: 20.4500, lng: 85.8667 },
{ name: "Damoh", lat: 23.8333, lng: 79.4500 },
{ name: "Dausa", lat: 26.8833, lng: 76.3333 },
{ name: "Davanagere", lat: 14.4667, lng: 75.9167 },
{ name: "Dehradun", lat: 30.3180, lng: 78.0290 },
{ name: "Delhi", lat: 28.6139, lng: 77.2090 },
{ name: "Dewas", lat: 22.9667, lng: 76.0667 },
{ name: "Dhanbad", lat: 23.8000, lng: 86.4500 },
];

const sampleAQIMap = {
  Agra: 34,
  Ahmedabad: 72,
  Ahmednagar: 38,
  Aizawi: 11,
  Ajmer: 66,
  Akola: 50,
  Alwar: 65,
  Amaravati: 39,
  Amravati: 48,
  Amritsar: 46,
  Anantapur: 58,
  Ankleshwar: 67,
  Ariyalur: 41,
  Asansol: 50,
  Aurangabad_Maharashtra: 44,
  Baddi: 63,
  Badlapur: 62,
  Bagalkot: 46,
  Baghpat: 76,
  Balasore: 50,
  Banswara: 56,
  Baran: 44,
  Barbil: 36,
  Bareilly: 66,
  Baripada: 38,
  Barmer: 84,
  Barrackpore: 66,
  Bathinda: 44,
  Belapur: 26,
  Belgaum: 32,
  Bengaluru: 62,
  Bharatpur: 26,
  Bhilai: 19,
  Bhilwara: 45,
  Bhiwadi: 76,
  Bhiwandi: 46,
  Bhopal: 48,
  Bhubaneswar: 62,
  Bikaner: 84,
  Bilaspur: 33,
  Bileipada: 21,
  Boisar: 44,
  Bulandshahr: 48,
  Bundi: 60,
  Byasanagar: 73,
  Bymihat: 128,
  Chamarajanagar: 43,
  Chandigarh: 39,
  Chandrapur: 62,
  Chengalpattu: 32,
  Chennai: 76,
  Chhai: 17,
  Chhapra: 115,
  Chikkaballapur: 26,
  Chikkamagaluru: 39,
  Chittoor: 69,
  Chittorgarh: 24,
  Churu: 115,
  Coimbatore: 30,
  Cuddalore: 32,
  Cuttack: 63,
  Damoh: 35,
  Dausa: 93,
  Davanagere: 74,
  Dehradun: 19,
  Delhi: 83,
  Dewas: 52,
  Dhanbad: 78,
};
const dummyPollutants = {
  Agra: [{ name: "SO₂", value: 45 }, { name: "PM10", value: 50 }],
  Ahmedabad: [{ name: "NO₂", value: 40 }, { name: "CO", value: 35 }],
  Ahmednagar: [{ name: "PM10", value: 38 }],
  Aizawi: [{ name: "PM10", value: 11 }],
  Ajmer: [{ name: "NO₂", value: 45 }],
  Akola: [{ name: "PM10", value: 50 }],
  Alwar: [{ name: "CO", value: 28 }],
  Amaravati: [{ name: "NO₂", value: 30 }],
  Amravati: [{ name: "PM10", value: 48 }],
  Amritsar: [{ name: "O₃", value: 25 }],
  Anantapur: [{ name: "PM2.5", value: 42 }],
  Ankleshwar: [{ name: "SO₂", value: 50 }],
  Ariyalur: [{ name: "PM10", value: 41 }],
  Asansol: [{ name: "CO", value: 30 }, { name: "PM10", value: 45 }],
  Aurangabad_Maharashtra: [{ name: "PM2.5", value: 35 }, { name: "CO", value: 28 }],
  Baddi: [{ name: "PM10", value: 55 }],
  Badlapur: [{ name: "PM10", value: 52 }],
  Bagalkot: [{ name: "PM10", value: 46 }],
  Baghpat: [{ name: "PM10", value: 60 }],
  Balasore: [{ name: "PM10", value: 50 }],
  Banswara: [{ name: "PM10", value: 45 }],
  Baran: [{ name: "O₃", value: 30 }],
  Barbil: [{ name: "O₃", value: 25 }],
  Bareilly: [{ name: "SO₂", value: 40 }],
  Baripada: [{ name: "CO", value: 28 }],
  Barmer: [{ name: "PM10", value: 70 }],
  Barrackpore: [{ name: "PM10", value: 55 }],
  Bathinda: [{ name: "NO₂", value: 35 }],
  Belapur: [{ name: "PM10", value: 20 }],
  Belgaum: [{ name: "NO₂", value: 25 }],
  Bengaluru: [{ name: "PM10", value: 55 }],
  Bharatpur: [{ name: "O₃", value: 20 }],
  Bhilai: [{ name: "NO₂-O₃", value: 15 }],
  Bhilwara: [{ name: "CO", value: 30 }],
  Bhiwadi: [{ name: "PM2.5-PM10", value: 60 }],
  Bhiwandi: [{ name: "PM10", value: 46 }],
  Bhopal: [{ name: "PM10", value: 48 }],
  Bhubaneswar: [{ name: "CO", value: 45 }],
  Bikaner: [{ name: "PM10", value: 70 }],
  Bilaspur: [{ name: "CO", value: 25 }],
  Bileipada: [{ name: "PM10", value: 15 }],
  Boisar: [{ name: "PM10", value: 40 }],
  Bulandshahr: [{ name: "PM10", value: 45 }],
  Bundi: [{ name: "PM10", value: 50 }],
  Byasanagar: [{ name: "CO", value: 55 }],
  Bymihat: [{ name: "PM2.5", value: 100 }],
  Chamarajanagar: [{ name: "PM10", value: 40 }],
  Chandigarh: [{ name: "O₃", value: 25 }, { name: "CO", value: 20 }, { name: "NH₃", value: 15 }],
  Chandrapur: [{ name: "SO₂", value: 45 }, { name: "CO", value: 35 }],
  Chengalpattu: [{ name: "PM10", value: 30 }],
  Chennai: [{ name: "O₃", value: 50 }, { name: "PM10", value: 55 }],
  Chhai: [{ name: "PM10", value: 10 }],
  Chhapra: [{ name: "NO₂", value: 90 }],
  Chikkaballapur: [{ name: "PM10", value: 20 }],
  Chikkamagaluru: [{ name: "PM10", value: 35 }],
  Chittoor: [{ name: "PM2.5", value: 55 }],
  Chittorgarh: [{ name: "CO", value: 18 }],
  Churu: [{ name: "O₃", value: 90 }],
  Coimbatore: [{ name: "PM2.5", value: 25 }, { name: "PM10", value: 30 }],
  Cuddalore: [{ name: "PM2.5", value: 25 }, { name: "PM10", value: 30 }],
  Cuttack: [{ name: "CO", value: 45 }],
  Damoh: [{ name: "PM10", value: 30 }],
  Dausa: [{ name: "PM10", value: 80 }],
  Davanagere: [{ name: "CO", value: 60 }],
  Dehradun: [{ name: "PM10", value: 15 }],
  Delhi: [{ name: "PM2.5", value: 65 }, { name: "PM10", value: 70 }],
  Dewas: [{ name: "PM10", value: 45 }],
  Dhanbad: [{ name: "NO₂", value: 60 }],
};


const containerStyle = {
  width: '100%',
  height: '100%'
};

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [cities] = useState(baseCities);
  const [selectedCity, setSelectedCity] = useState(baseCities[0]);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTimeout(() => setShowSplash(false), 3000);
    setSelectedCity(baseCities[0]);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const closest = findClosestCity(latitude, longitude);
        if (closest) setSelectedCity(closest);
      });
    }
  }, []);

  const findClosestCity = (lat, lng) => {
    let minDist = Infinity;
    let closest = null;
    for (const city of baseCities) {
      const dist = Math.sqrt(Math.pow(city.lat - lat, 2) + Math.pow(city.lng - lng, 2));
      if (dist < minDist) {
        minDist = dist;
        closest = city;
      }
    }
    return closest;
  };

  const filteredCities = cities.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const handleSearchSelect = (e) => {
    const value = e.target.value;
    setSearch(value);
    const match = baseCities.find(c => c.name.toLowerCase() === value.toLowerCase());
    if (match) {
      setSelectedCity(match);
      setSearch("");
    }
  };

  return (
    <div className="h-screen w-full overflow-hidden font-sans bg-gray-50 dark:bg-gray-900">
      <AnimatePresence mode="wait">
        {showSplash ? (
          <motion.div
            key="splash"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full flex flex-col items-center justify-center text-center px-6 bg-white dark:bg-black"
          >
            <div className="w-32 h-32 mx-auto mb-4">
              <DotLottieReact src="https://lottie.host/58ec8169-e984-48e3-afd7-944cb49f4ec5/DELcUdq6hH.json" loop autoplay />
            </div>
            <h1 className="text-5xl font-semibold text-gray-900 dark:text-white mb-4 tracking-tight" style={{ fontFamily: '-apple-system, SF Pro Display' }}>VAYUMAP</h1>
            <div className="h-12 w-12 mx-auto mb-2 rounded-full border-4 border-gray-200 dark:border-gray-600 border-t-blue-500 animate-spin" />
            <p className="text-gray-400 text-sm" style={{ fontFamily: '-apple-system, SF Pro Text' }}>Loading, please wait...</p>
          </motion.div>
        ) : (
          <div className="h-full w-full flex flex-col">
            {/* iOS-style Header */}
            <div className="pt-12 px-5 pb-3 bg-white dark:bg-gray-900">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight" style={{ fontFamily: '-apple-system, SF Pro Display' }}>VAYUMAP</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1" style={{ fontFamily: '-apple-system, SF Pro Text' }}>Real-time AQI monitoring</p>
            </div>

            {/* iOS-style Search Bar */}
           {/* iOS-style Search Bar */}
<div className="px-5 py-3 bg-white dark:bg-gray-900">
  <div className="relative max-w-xl mx-auto">
    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
    <input
      type="text"
      placeholder="Search city..."
      className="w-full bg-gray-100 dark:bg-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ fontFamily: '-apple-system, SF Pro Text' }}
    />
    {search.length > 0 && (
      <div className="absolute w-full mt-2 rounded-xl overflow-hidden shadow-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50 max-h-64 overflow-y-auto">
        {filteredCities.length > 0 ? (
          filteredCities.map(city => (
            <div
              key={city.name}
              onClick={() => {
                setSelectedCity(city);
                setSearch('');
              }}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer text-sm text-gray-900 dark:text-white transition-all duration-150 ease-in-out"
              style={{ fontFamily: '-apple-system, SF Pro Text' }}
            >
              {city.name}
            </div>
          ))
        ) : (
          <div className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: '-apple-system, SF Pro Text' }}>
            No results found
          </div>
        )}
      </div>
    )}
  </div>
</div>

            {/* Page Content */}
            <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
              <AnimatePresence mode="wait">
                {tab === 0 && <motion.div key="home" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}><HomeDashboard city={selectedCity} /></motion.div>}
                {tab === 1 && <motion.div key="trends" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}><HistoricalTrends city={selectedCity} /></motion.div>}
                {tab === 2 && <motion.div key="forecast" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}><Forecasting city={selectedCity} /></motion.div>}
                {tab === 3 && <motion.div key="advisory" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}><HealthAdvisory /></motion.div>}
              </AnimatePresence>
            </div>

            {/* iOS-style Tab Bar */}
            <div className="flex bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 pb-5 pt-2 px-4">
              {[
                { icon: '🏠', label: 'Home' },
                { icon: '📈', label: 'Trends' },
                { icon: '🌤', label: 'Forecast' },
                { icon: '❤️', label: 'Health' }
              ].map((item, i) => (
                <button
                  key={item.label}
                  className={`flex-1 flex flex-col items-center justify-center py-2 transition-all duration-300 ${tab === i ? 'text-blue-500' : 'text-gray-500'}`}
                  onClick={() => setTab(i)}
                >
                  <div className="w-6 h-6 flex items-center justify-center mb-1">
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <span className="text-xs" style={{ fontFamily: '-apple-system, SF Pro Text' }}>{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HomeDashboard({ city }) {
  const centerCoordinates = {
    [city.name]: { lat: city.lat, lng: city.lng },
  };
  const currentAQI = sampleAQIMap[city.name];

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
          <LoadScript googleMapsApiKey="google_api">
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
          {(dummyPollutants[city.name] || []).length > 0 ? (
            dummyPollutants[city.name].map((p) => (
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

function HistoricalTrends({ city }) {
  const cityName = city?.name || 'Agartala';
const trendsDataMap = {
  Agartala: [89, 28, 73, 125, 60, 99, 114],
  Agra: [102, 39, 34, 97, 70, 78, 85],
  Ahmedabad: [74, 52, 72, 110, 67, 105, 95],
  Ahmednagar: [71, 44, 38, 61, 91, 133, 119],
  Aizawl: [22, 11, 11, 14, 56, 132, 77],
  Ajmer: [121, 76, 66, 128, 92, 116, 137],
  Akola: [109, 40, 50, 75, 101, 123, 90],
  Alwar: [117, 63, 65, 113, 133, 144, 141],
  Amaravati: [56, 38, 39, 47, 61, 98, 82],
  Amravati: [69, 40, 48, 54, 102, 111, 95],
  Amritsar: [70, 34, 46, 67, 85, 93, 128],
  Anantapur: [116, 65, 58, 104, 132, 106, 121],
  Ankleshwar: [114, 60, 67, 84, 127, 138, 112],
  Ariyalur: [92, 39, 41, 55, 101, 130, 123],
  Asansol: [108, 35, 50, 75, 96, 113, 121],
  Aurangabad: [76, 44, 44, 66, 98, 111, 103],
  Baddi: [127, 72, 63, 135, 138, 147, 133],
  Badlapur: [97, 57, 62, 90, 107, 114, 122],
  Bagalkot: [80, 46, 46, 71, 95, 109, 98],
  Baghpat: [137, 78, 76, 139, 128, 141, 135],
  Balasore: [78, 42, 50, 77, 106, 120, 110],
  Banswara: [96, 54, 56, 89, 115, 121, 118],
  Baran: [81, 42, 44, 59, 87, 113, 108],
  Barbil: [67, 30, 36, 46, 68, 84, 74],
  Bareilly: [59, 55, 66, 81, 96, 112, 102],
  Baripada: [66, 39, 38, 50, 72, 90, 88],
  Barmer: [113, 57, 84, 108, 130, 139, 128],
  Barrackpore: [91, 48, 66, 79, 104, 118, 106],
  Bathinda: [78, 67, 44, 84, 92, 103, 95],
  Belapur: [87, 91, 26, 72, 88, 99, 93],
  Belgaum: [96, 70, 32, 83, 107, 116, 112],
  Bengaluru: [95, 57, 62, 78, 104, 111, 105],
  Bharatpur: [76, 51, 26, 64, 90, 103, 97],
  Bhilai: [53, 16, 19, 42, 59, 74, 63],
  Bhilwara: [77, 47, 45, 60, 91, 100, 94],
  Bhiwadi: [109, 58, 76, 104, 129, 138, 124],
  Bhiwandi: [91, 53, 46, 82, 99, 111, 104],
  Bhopal: [88, 49, 48, 69, 95, 107, 100],
  Bhubaneswar: [119, 66, 62, 113, 124, 135, 128],
  Bikaner: [135, 86, 84, 143, 141, 150, 137],
  Bilaspur: [81, 37, 33, 62, 90, 101, 94],
  Bileipada: [55, 20, 21, 44, 63, 70, 66],
  Boisar: [70, 44, 44, 66, 84, 91, 87],
  Bulandshahr: [75, 33, 48, 67, 91, 104, 96],
  Bundi: [102, 58, 60, 98, 117, 121, 116],
  Byasanagar: [138, 76, 73, 142, 130, 145, 133],
  Byrnihat: [150, 150, 128, 144, 137, 150, 150],
  Chamarajanagar: [76, 40, 43, 68, 91, 102, 95],
  Chandigarh: [88, 56, 39, 81, 96, 110, 100],
  Chandrapur: [103, 58, 62, 97, 113, 121, 116],
  Chengalpattu: [82, 54, 32, 78, 95, 102, 91],
  Chennai: [121, 75, 76, 128, 133, 144, 137],
  Chhal: [72, 38, 17, 55, 77, 84, 76],
  Chhapra: [133, 110, 115, 140, 129, 138, 132],
  Chikkaballapur: [60, 30, 26, 48, 69, 76, 71],
  Chikkamagaluru: [71, 36, 39, 66, 83, 94, 86],
  Chittoor: [123, 73, 69, 130, 138, 145, 139],
  Chittorgarh: [64, 35, 24, 56, 78, 85, 74],
  Churu: [139, 51, 115, 136, 141, 145, 140],
  Coimbatore: [48, 12, 30, 47, 71, 88, 82],
  Cuddalore: [62, 47, 32, 58, 79, 86, 80],
  Cuttack: [130, 80, 63, 119, 127, 140, 134],
  Damoh: [56, 25, 35, 49, 67, 79, 72],
  Dausa: [144, 85, 93, 142, 150, 149, 145],
  Davanagere: [91, 78, 74, 95, 109, 115, 108],
  Dehradun: [66, 24, 19, 57, 81, 89, 82],
  Delhi: [121, 65, 83, 130, 141, 146, 138],
  Dewas: [93, 50, 52, 86, 107, 115, 110],
  Dhanbad: [132, 74, 78, 128, 140, 144, 139]
};




  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const cityAQIs = trendsDataMap[cityName] || [0, 0, 0, 0, 0, 0, 0];
  const trendsData = days.map((day, idx) => ({ name: day, AQI: cityAQIs[idx] }));

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white" style={{ fontFamily: '-apple-system, SF Pro Display' }}>Weekly Trends</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400" style={{ fontFamily: '-apple-system, SF Pro Text' }}>AQI for {cityName}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-800 rounded-full px-3 py-1">
          <span className="text-xs" style={{ fontFamily: '-apple-system, SF Pro Text' }}>Last 7 days</span>
        </div>
      </div>

      <div className="w-full h-64 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trendsData}>
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
              stroke="#3B82F6" 
              strokeWidth={3} 
              dot={{ r: 4, fill: '#3B82F6', strokeWidth: 2, stroke: '#FFFFFF' }} 
              activeDot={{ r: 6, stroke: '#FFFFFF', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1" style={{ fontFamily: '-apple-system, SF Pro Text' }}>Highest</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white" style={{ fontFamily: '-apple-system, SF Pro Display' }}>
            {Math.max(...cityAQIs)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1" style={{ fontFamily: '-apple-system, SF Pro Text' }}>Average</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white" style={{ fontFamily: '-apple-system, SF Pro Display' }}>
            {Math.round(cityAQIs.reduce((a, b) => a + b, 0) / cityAQIs.length)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-100 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1" style={{ fontFamily: '-apple-system, SF Pro Text' }}>Lowest</p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white" style={{ fontFamily: '-apple-system, SF Pro Display' }}>
            {Math.min(...cityAQIs)}
          </p>
        </div>
      </div>
    </div>
  );
}

function Forecasting({ city }) {
  const [forecastData, setForecastData] = useState([]);
  const cityName = city?.name || 'Agartala';

  const forecastingnext = {
  Agartala: [89, 28, 73, 125, 60, 99, 114],
  Agra: [102, 39, 34, 97, 70, 78, 85],
  Ahmedabad: [74, 52, 72, 110, 67, 105, 95],
  Ahmednagar: [71, 44, 38, 61, 91, 133, 119],
  Aizawl: [22, 11, 11, 14, 56, 132, 77],
  Ajmer: [121, 76, 66, 128, 92, 116, 137],
  Akola: [109, 40, 50, 75, 101, 123, 90],
  Alwar: [117, 63, 65, 113, 133, 144, 141],
  Amaravati: [56, 38, 39, 47, 61, 98, 82],
  Amravati: [69, 40, 48, 54, 102, 111, 95],
  Amritsar: [70, 34, 46, 67, 85, 93, 128],
  Anantapur: [116, 65, 58, 104, 132, 106, 121],
  Ankleshwar: [114, 60, 67, 84, 127, 138, 112],
  Ariyalur: [92, 39, 41, 55, 101, 130, 123],
  Asansol: [108, 35, 50, 75, 96, 113, 121],
  Aurangabad: [76, 44, 44, 66, 98, 111, 103],
  Baddi: [127, 72, 63, 135, 138, 147, 133],
  Badlapur: [97, 57, 62, 90, 107, 114, 122],
  Bagalkot: [80, 46, 46, 71, 95, 109, 98],
  Baghpat: [137, 78, 76, 139, 128, 141, 135],
  Balasore: [78, 42, 50, 77, 106, 120, 110],
  Banswara: [96, 54, 56, 89, 115, 121, 118],
  Baran: [81, 42, 44, 59, 87, 113, 108],
  Barbil: [67, 30, 36, 46, 68, 84, 74],
  Bareilly: [59, 55, 66, 81, 96, 112, 102],
  Baripada: [66, 39, 38, 50, 72, 90, 88],
  Barmer: [113, 57, 84, 108, 130, 139, 128],
  Barrackpore: [91, 48, 66, 79, 104, 118, 106],
  Bathinda: [78, 67, 44, 84, 92, 103, 95],
  Belapur: [87, 91, 26, 72, 88, 99, 93],
  Belgaum: [96, 70, 32, 83, 107, 116, 112],
  Bengaluru: [95, 57, 62, 78, 104, 111, 105],
  Bharatpur: [76, 51, 26, 64, 90, 103, 97],
  Bhilai: [53, 16, 19, 42, 59, 74, 63],
  Bhilwara: [77, 47, 45, 60, 91, 100, 94],
  Bhiwadi: [109, 58, 76, 104, 129, 138, 124],
  Bhiwandi: [91, 53, 46, 82, 99, 111, 104],
  Bhopal: [88, 49, 48, 69, 95, 107, 100],
  Bhubaneswar: [119, 66, 62, 113, 124, 135, 128],
  Bikaner: [135, 86, 84, 143, 141, 150, 137],
  Bilaspur: [81, 37, 33, 62, 90, 101, 94],
  Bileipada: [55, 20, 21, 44, 63, 70, 66],
  Boisar: [70, 44, 44, 66, 84, 91, 87],
  Bulandshahr: [75, 33, 48, 67, 91, 104, 96],
  Bundi: [102, 58, 60, 98, 117, 121, 116],
  Byasanagar: [138, 76, 73, 142, 130, 145, 133],
  Byrnihat: [150, 150, 128, 144, 137, 150, 150],
  Chamarajanagar: [76, 40, 43, 68, 91, 102, 95],
  Chandigarh: [88, 56, 39, 81, 96, 110, 100],
  Chandrapur: [103, 58, 62, 97, 113, 121, 116],
  Chengalpattu: [82, 54, 32, 78, 95, 102, 91],
  Chennai: [121, 75, 76, 128, 133, 144, 137],
  Chhal: [72, 38, 17, 55, 77, 84, 76],
  Chhapra: [133, 110, 115, 140, 129, 138, 132],
  Chikkaballapur: [60, 30, 26, 48, 69, 76, 71],
  Chikkamagaluru: [71, 36, 39, 66, 83, 94, 86],
  Chittoor: [123, 73, 69, 130, 138, 145, 139],
  Chittorgarh: [64, 35, 24, 56, 78, 85, 74],
  Churu: [139, 51, 115, 136, 141, 145, 140],
  Coimbatore: [48, 12, 30, 47, 71, 88, 82],
  Cuddalore: [62, 47, 32, 58, 79, 86, 80],
  Cuttack: [130, 80, 63, 119, 127, 140, 134],
  Damoh: [56, 25, 35, 49, 67, 79, 72],
  Dausa: [144, 85, 93, 142, 150, 149, 145],
  Davanagere: [91, 78, 74, 95, 109, 115, 108],
  Dehradun: [66, 24, 19, 57, 81, 89, 82],
  Delhi: [121, 65, 83, 130, 141, 146, 138],
  Dewas: [93, 50, 52, 86, 107, 115, 110],
  Dhanbad: [132, 74, 78, 128, 140, 144, 139]
};

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

function HealthAdvisory() {
  const advisoryTable = [
    { range: "0–50", level: "Good", message: "Enjoy your day! No health impacts. Go for a walk, jog, or cycle freely.", bg: "bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100", icon: "😊" },
    { range: "51–100", level: "Moderate", message: "Unusually sensitive people (asthma, COPD) should reduce prolonged outdoor exertion.", bg: "bg-yellow-100 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100", icon: "😐" },
    { range: "101–150", level: "Unhealthy for Sensitive Groups", message: "People with lung or heart conditions, children, and elderly should limit outdoor activity. Use masks if needed.", bg: "bg-orange-100 dark:bg-orange-800 text-orange-900 dark:text-orange-100", icon: "😷" },
    { range: "151–200", level: "Unhealthy", message: "Everyone may begin to experience health effects. Avoid outdoor exercise. Asthma & heart patients must stay indoors.", bg: "bg-red-100 dark:bg-red-800 text-red-900 dark:text-red-100", icon: "🤒" },
    { range: "201–300", level: "Very Unhealthy", message: "Serious health effects possible. Limit time outdoors. N95 masks recommended. Use air purifiers indoors.", bg: "bg-purple-100 dark:bg-purple-800 text-purple-900 dark:text-purple-100", icon: "🤢" },
    { range: "301–500", level: "Hazardous", message: "Health alert! Emergency conditions. Avoid all outdoor activity. Stay indoors with sealed windows.", bg: "bg-black text-white", icon: "⚠️" },
  ];

  return (
    <div className="p-5">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1" style={{ fontFamily: '-apple-system, SF Pro Display' }}>Health Advisory</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-5" style={{ fontFamily: '-apple-system, SF Pro Text' }}>Based on AQI levels</p>

      <div className="space-y-3">
        {advisoryTable.map((item, idx) => (
          <div key={idx} className={`p-4 rounded-xl ${item.bg} flex items-start`}>
            <div className="text-2xl mr-3">{item.icon}</div>
            <div>
              <h3 className="font-semibold mb-1 text-sm" style={{ fontFamily: '-apple-system, SF Pro Display' }}>
                {item.level} — AQI {item.range}
              </h3>
              <p className="text-xs" style={{ fontFamily: '-apple-system, SF Pro Text' }}>{item.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function getAQIEmoji(aqi) {
  if (aqi <= 50) return '🟢';
  if (aqi <= 100) return '🟡';
  if (aqi <= 200) return '🟠';
  if (aqi <= 300) return '🔴';
  if (aqi <= 400) return '🟣';
  return '⚫';
}

function getAQIColorClass(aqi) {
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-500';
  if (aqi <= 200) return 'bg-orange-500';
  if (aqi <= 300) return 'bg-red-500';
  if (aqi <= 400) return 'bg-purple-600';
  return 'bg-black';
}

function getAQICategory(aqi) {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  if (aqi <= 400) return 'Hazardous';
  return 'Severe';
}

function getHealthAdvisory(aqi) {
  const table = [
    { min: 0, max: 50, level: "Good", message: "Enjoy your day! No health impacts. Go for a walk, jog, or cycle freely.", bg: "bg-green-100 dark:bg-green-800 text-green-900 dark:text-green-100" },
    { min: 51, max: 100, level: "Moderate", message: "Unusually sensitive people (asthma, COPD) should reduce prolonged outdoor exertion.", bg: "bg-yellow-100 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100" },
    { min: 101, max: 150, level: "Unhealthy for Sensitive Groups", message: "People with lung or heart conditions, children, and elderly should limit outdoor activity. Use masks if needed.", bg: "bg-orange-100 dark:bg-orange-800 text-orange-900 dark:text-orange-100" },
    { min: 151, max: 200, level: "Unhealthy", message: "Everyone may begin to experience health effects. Avoid outdoor exercise. Asthma & heart patients must stay indoors.", bg: "bg-red-100 dark:bg-red-800 text-red-900 dark:text-red-100" },
    { min: 201, max: 300, level: "Very Unhealthy", message: "Serious health effects possible. Limit time outdoors. N95 masks recommended. Use air purifiers indoors.", bg: "bg-purple-100 dark:bg-purple-800 text-purple-900 dark:text-purple-100" },
    { min: 301, max: 500, level: "Hazardous", message: "Health alert! Emergency conditions. Avoid all outdoor activity. Stay indoors with sealed windows.", bg: "bg-black text-white" },
  ];
  return table.find(a => aqi >= a.min && aqi <= a.max) || table[0];
}

function getPollutantIcon(name) {
  const icons = {
    "PM2.5": "🌫️",
    "PM10": "🌁",
    "NO₂": "🟪",
    "SO₂": "🧪",
    "O₃": "🌀",
    "CO": "🔥"
  };
  return icons[name] || "🧭";
}

function getPollutantColorClass(name) {
  const colors = {
    "PM2.5": "bg-blue-100 dark:bg-blue-800",
    "PM10": "bg-indigo-100 dark:bg-indigo-800",
    "NO₂": "bg-purple-100 dark:bg-purple-800",
    "SO₂": "bg-yellow-100 dark:bg-yellow-800",
    "O₃": "bg-green-100 dark:bg-green-800",
    "CO": "bg-red-100 dark:bg-red-800"
  };
  return colors[name] || "bg-gray-100 dark:bg-gray-700";
}

