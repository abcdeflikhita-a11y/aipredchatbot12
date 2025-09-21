import React from 'react';
import Header from './components/Header';
import ChatInterface from './components/ChatInterface';
import StarfieldBackground from './components/StarfieldBackground';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <StarfieldBackground />
      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 pt-20 pb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              AI Predictor Chatbot
            </h1>
            <p className="text-green-200 text-lg">
              Smart Agricultural Assistant for Odia Farmers
            </p>
          </div>
          <ChatInterface />
        </main>
      </div>
    </div>
  );
}

export default App;