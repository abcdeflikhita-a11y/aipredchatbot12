import React from 'react';
import { Sprout, Home } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-green-400 to-green-600 rounded-xl shadow-lg">
            <Sprout className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-400 via-green-500 to-green-600 bg-clip-text text-transparent">
            AgriAI
          </h1>
        </div>

        {/* Home Button */}
        <a
          href="https://agri-ai-4farmer.vercel.app/"
          className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105"
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </a>
      </div>
    </header>
  );
};

export default Header;
