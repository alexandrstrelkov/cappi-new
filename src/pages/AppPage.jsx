import React, { useState } from 'react';
import { FaTelegramPlane, FaTwitter, FaMedium } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import data from '../data/data.json';

function AppPage() {
  const [selectedRange, setSelectedRange] = useState(7);

  const filteredData = data.slice(-selectedRange);

  const latestTVL = data.length ? data[data.length - 1].tvl : 0;
  const last7DaysData = data.slice(-7);
  const yield7DaysAgo = last7DaysData.length > 0 ? last7DaysData[0].yield : 0;
  const yieldNow = last7DaysData.length > 0 ? last7DaysData[last7DaysData.length - 1].yield : 0;
  const sevenDayYield = yieldNow - yield7DaysAgo;
  
  const handleRangeChange = (range) => {
    setSelectedRange(range);
  };

  return (
    <div className="bg-gradient-to-br from-purple-700 via-purple-800 to-pink-700 min-h-screen text-white flex flex-col justify-between">

      {/* Header */}
      <header className="bg-gray-950 text-white flex justify-between items-center px-6 py-4 shadow">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-800 rounded-full"></div>
          <h1 className="text-xl font-semibold">Cappi Finance</h1>
        </div>
        <button className="bg-purple-500 text-white font-bold px-4 py-2 rounded-xl hover:bg-purple-700 transition">
          Connect Wallet
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center px-4 py-12 space-y-12">
        {/* Vault Info */}
        <div className="bg-gray-900 rounded-2xl shadow-lg p-8 w-full max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">USDC Cappi Vault</h2>
          <div className="flex flex-col sm:flex-row justify-around text-lg font-semibold mb-6">
            <div>
              <p className="text-gray-500">Total Value Locked</p>
              <p className="text-purple-800 text-2xl">${latestTVL.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-500">7-Day Yield</p>
              <p className="text-purple-800 text-2xl">{sevenDayYield.toFixed(2)}%</p>
            </div>
          </div>

          {/* Range Selector */}
          <div className="flex justify-center space-x-4 mb-6">
            {[7, 30, 90].map((range) => (
              <button
                key={range}
                onClick={() => handleRangeChange(range)}
                className={`px-4 py-2 rounded-lg font-medium border ${
                  selectedRange === range
                    ? 'bg-purple-700 text-white'
                    : 'bg-white border-gray-300 text-purple-700'
                } hover:bg-purple-100 transition`}
              >
                {range} Days
              </button>
            ))}
          </div>

          {/* Chart */}
          <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="date" stroke="#888" tick={false} axisLine={false} />
                <YAxis stroke="#888" tick={false} axisLine={false} />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'Yield (%)') return [`${value.toFixed(2)}%`, name];
                    if (name === 'TVL') return [`$${value.toLocaleString()}`, name];
                    return [value, name];
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="yield" stroke="#a855f7" strokeWidth={2} name="Yield (%)" />
                <Line type="monotone" dataKey="tvl" stroke="#ec4899" strokeWidth={2} name="TVL" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>


        {/* Connect Wallet Again */}
        <button className="bg-purple-500 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:bg-purple-700 transition">
          Connect Wallet
        </button>
      </main>

      {/* Footer */}
      <footer className="bg-gray-950 px-6 py-6 text-sm text-white/80 flex flex-col items-center space-y-4">
        <p className="text-center max-w-xl">
          A secure DeFi protocol with a fixed 0.05–0.1% daily return. Stake your USDC and watch your balance grow — simple, predictable, and transparent.
        </p>
        <div className="flex space-x-6 text-xl">
          <a href="https://t.me/cappi" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaTelegramPlane />
          </a>
          <a href="https://x.com/cappi" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaTwitter />
          </a>
          <a href="https://medium.com/@cappi" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaMedium />
          </a>
        </div>
      </footer>

    </div>
  );
}

export default AppPage;
