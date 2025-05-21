import React from 'react';
import {useNavigate} from 'react-router-dom';
import {FaTelegramPlane, FaXTwitter, FaMedium} from 'react-icons/fa6';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-pink-400 text-white flex flex-col justify-between">
      
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-purple-800 rounded-full"></div>
          <h1 className="text-xl font-semibold">Cappi Finance</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center text-center px-4 py-12 sm:py-20">
        <h2 className="text-4xl sm:text-6xl font-bold mb-4">Cappi Finance</h2>
        <p className="text-lg sm:text-xl mb-8 max-w-xl">
          DeFi доходность, которая работает. Просто. Надёжно. Капибарно.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/app')}
            className="bg-white text-purple-700 font-semibold px-6 py-3 rounded-2xl shadow-lg hover:bg-purple-100 transition"
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
      </main>

      {/* Footer */}
      <footer className="px-6 py-6 text-sm text-white/80 flex flex-col items-center space-y-4">
        <p className="text-center max-w-xl">
          Cappi Finance — это безопасный способ получать стабильную доходность в USDC с возможностью вывода средств в любое время. Умно, просто, Cappi.
        </p>
        <div className="flex space-x-6 text-xl">
          <a href="https://t.me/cappi" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaTelegramPlane />
          </a>
          <a href="https://x.com/cappi" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <FaXTwitter />
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
