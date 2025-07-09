import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { trendsDataMap } from '../data/aqiData';

export default function HistoricalTrends({ city }) {
  const cityName = city?.name || 'Agartala';
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