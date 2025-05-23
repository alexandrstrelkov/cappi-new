import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTelegramPlane, FaTwitter, FaMedium } from 'react-icons/fa';
import data from '../data/data.json'; // обязательно импортируй данные вверху файла

function LandingPage() {
  const navigate = useNavigate();

  const last7Days = data.slice(-7);
  const sevenDayYield = last7Days.reduce((sum, day) => sum + day.yield, 0); // без деления

  return (
    <div className="bg-gradient-to-br from-purple-700 via-purple-800 to-pink-700 min-h-screen text-white flex flex-col justify-between">
      
      {/* Header */}
      <header className="bg-gray-950 flex justify-between items-center px-6 py-4 shadow">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-800 rounded-full"></div>
          <h1 className="text-xl font-semibold text-white">Cappi Finance</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center text-center px-4 py-12 sm:py-20">
        <div className="bg-gray-900 rounded-2xl p-8 shadow-xl w-full max-w-2xl">
          <h2 className="text-4xl sm:text-6xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            Cappi Finance
          </h2>
          <p className="text-lg sm:text-xl mb-4 max-w-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mx-auto">
            Stake your USDC and earn daily yield with Cappi
          </p>
      
          {/* 7-Day Yield Block */}
          <div className="mb-6">
            <p className="text-sm text-gray-400">Last 7-Day APY</p>
            <p className="text-2xl font-semibold text-purple-400">{sevenDayYield.toFixed(1)}%</p>
          </div>
      
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/app')}
              className="bg-purple-500 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:bg-purple-700 hover:shadow-xl transition"
            >
              Launch App
            </button>
            <a
              href="#"
              className="bg-transparent border border-white px-6 py-3 rounded-2xl font-semibold hover:bg-white hover:text-purple-700 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-gray-950 px-6 py-6 text-sm text-white/80 flex flex-col items-center space-y-4">
        <p className="text-center max-w-xl">
          Stake your USDC and watch your balance grow — simple, predictable, and transparent.
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

export default LandingPage;
