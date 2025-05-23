import React, { useState } from 'react';
import { FaTelegramPlane, FaTwitter, FaMedium } from 'react-icons/fa';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import data from '../data/data.json';

function AppPage() {
  const [selectedRange, setSelectedRange] = useState(7);
  const [userSelectedRange, setUserSelectedRange] = useState(7);

  const filteredDataRaw = data.slice(-selectedRange);
  let simpleSum = 0;
  const filteredData = filteredDataRaw.map((entry) => {
    simpleSum += entry.yield;
    return {
      ...entry,
      yieldAccumulated: simpleSum,
    };
  });

  const userFilteredDataRaw = data.slice(-userSelectedRange);
  let userSimpleSum = 0;
  const userFilteredData = userFilteredDataRaw.map((entry) => {
    userSimpleSum += entry.yield;
    return {
      ...entry,
      yieldAccumulated: userSimpleSum,
    };
  });

  const latestTVL = data.length ? data[data.length - 1].tvl : 0;
  const cumulativeYield = filteredDataRaw.reduce((acc, day) => acc + day.yield, 0);
  const userCumulativeYield = userFilteredDataRaw.reduce((acc, day) => acc + day.yield, 0);

  const handleRangeChange = (range) => setSelectedRange(range);
  const handleUserRangeChange = (range) => setUserSelectedRange(range);

  return (
    <div className="bg-gradient-to-br from-purple-700 via-purple-800 to-pink-700 min-h-screen text-white flex flex-col justify-between">
      <header className="bg-gray-950 text-white flex justify-between items-center px-6 py-4 shadow">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-800 rounded-full"></div>
          <h1 className="text-xl font-semibold">Cappi Finance</h1>
        </div>
      </header>

      <main className="flex flex-col items-center px-4 py-12 space-y-12">
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
          {/* Vault Info Block */}
          <div className="bg-gray-900 rounded-2xl shadow-lg p-8 w-full lg:w-2/3 text-center">
            <h2 className="text-3xl font-bold text-purple-700 mb-4">USDC Cappi Vault</h2>
            <div className="flex flex-col sm:flex-row justify-around text-lg font-semibold mb-6">
              <div>
                <p className="text-gray-500">Total Value Locked</p>
                <p className="text-purple-800 text-2xl">${latestTVL.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-gray-500">{selectedRange}-Day Yield</p>
                <p className="text-purple-800 text-2xl">{cumulativeYield.toFixed(2)}%</p>
              </div>
            </div>

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

            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="date" stroke="#888" tick={false} axisLine={false} />
                  <YAxis yAxisId="left" stroke="#ec4899" tick={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" stroke="#a855f7" tick={false} axisLine={false} />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === 'Yield (%)') return [`${value.toFixed(2)}%`, name];
                      if (name === 'TVL') return [`$${value.toLocaleString()}`, name];
                      return [value, name];
                    }}
                  />
                  <Legend />
                  <Line yAxisId="right" type="monotone" dataKey="yieldAccumulated" stroke="#a855f7" strokeWidth={2} name="Yield (%)" />
                  <Line yAxisId="left" type="monotone" dataKey="tvl" stroke="#ec4899" strokeWidth={2} name="TVL" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* User Info Block */}
          <div className="bg-gray-900 rounded-2xl shadow-lg p-8 w-full lg:w-1/3 text-center flex flex-col items-center">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Your Vault</h2>
            <p className="text-gray-500">Your Deposit</p>
            <p className="text-purple-800 text-2xl mb-4">$0.00</p>
            <p className="text-gray-500">{userSelectedRange}-Day Yield</p>
            <p className="text-purple-800 text-2xl mb-6">{userCumulativeYield.toFixed(2)}%</p>
            <div className="flex gap-4 mb-6">
              <button className="bg-purple-500 text-white px-4 py-2 rounded-xl font-bold hover:bg-purple-700 transition">Deposit</button>
              <button className="bg-white text-purple-700 px-4 py-2 rounded-xl font-bold hover:bg-purple-100 transition">Withdraw</button>
            </div>
            <div className="flex justify-center space-x-4 mb-4">
              {[7, 30, 90].map((range) => (
                <button
                  key={range}
                  onClick={() => handleUserRangeChange(range)}
                  className={`px-4 py-2 rounded-lg font-medium border ${
                    userSelectedRange === range
                      ? 'bg-purple-700 text-white'
                      : 'bg-white border-gray-300 text-purple-700'
                  } hover:bg-purple-100 transition`}
                >
                  {range} Days
                </button>
              ))}
            </div>
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userFilteredData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="date" stroke="#888" tick={false} axisLine={false} />
                  <YAxis stroke="#a855f7" tick={false} axisLine={false} />
                  <Tooltip formatter={(value, name) => [`${value.toFixed(2)}%`, 'Yield (%)']} />
                  <Legend />
                  <Line type="monotone" dataKey="yieldAccumulated" stroke="#a855f7" strokeWidth={2} name="Yield (%)" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <button className="bg-purple-500 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:bg-purple-700 transition mt-6">
              Connect Wallet
            </button>
          </div>
        </div>
      </main>

      <footer className="bg-gray-950 px-6 py-6 text-sm text-white/80 flex flex-col items-center space-y-4">
        <div className="text-center max-w-xl">
          A secure DeFi protocol with a fixed 0.05–0.1% daily return. Stake your USDC and watch your balance grow — simple, predictable, and transparent.
        </div>
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
