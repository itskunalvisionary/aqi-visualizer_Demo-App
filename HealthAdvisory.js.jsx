import React from 'react';

export default function HealthAdvisory() {
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