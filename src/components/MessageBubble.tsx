import React from 'react';
import { Bot, User } from 'lucide-react';

interface MessageBubbleProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isBot, timestamp }) => {
  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}>
      <div className={`flex max-w-[80%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 ${isBot ? 'mr-3' : 'ml-3'}`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            isBot 
              ? 'bg-gradient-to-br from-green-400 to-green-600' 
              : 'bg-gradient-to-br from-blue-400 to-blue-600'
          }`}>
            {isBot ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
          </div>
        </div>

        {/* Message Content */}
        <div className={`rounded-2xl px-4 py-3 shadow-lg ${
          isBot 
            ? 'bg-green-500/20 backdrop-blur-sm border border-green-400/30 text-white' 
            : 'bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 text-white'
        }`}>
          <div className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">
            {message}
          </div>
          <div className="text-xs opacity-60 mt-2">
            {timestamp.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;