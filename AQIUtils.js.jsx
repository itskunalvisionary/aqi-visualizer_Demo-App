export function getAQIEmoji(aqi) {
  if (aqi <= 50) return '🟢';
  if (aqi <= 100) return '🟡';
  if (aqi <= 200) return '🟠';
  if (aqi <= 300) return '🔴';
  if (aqi <= 400) return '🟣';
  return '⚫';
}

export function getAQIColorClass(aqi) {
  if (aqi <= 50) return 'bg-green-500';
  if (aqi <= 100) return 'bg-yellow-500';
  if (aqi <= 200) return 'bg-orange-500';
  if (aqi <= 300) return 'bg-red-500';
  if (aqi <= 400) return 'bg-purple-600';
  return 'bg-black';
}

export function getAQICategory(aqi) {
  if (aqi <= 50) return 'Good';
  if (aqi <= 100) return 'Moderate';
  if (aqi <= 200) return 'Unhealthy';
  if (aqi <= 300) return 'Very Unhealthy';
  if (aqi <= 400) return 'Hazardous';
  return 'Severe';
}

export function getHealthAdvisory(aqi) {
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

export function getPollutantIcon(name) {
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

export function getPollutantColorClass(name) {
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