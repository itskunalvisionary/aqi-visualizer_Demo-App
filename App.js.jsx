import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import HomeDashboard from './components/HomeDashboard';
import HistoricalTrends from './components/HistoricalTrends';
import Forecasting from './components/Forecasting';
import HealthAdvisory from './components/HealthAdvisory';
import { baseCities } from './data/cities';

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