import React, { useState, useRef } from 'react';
import { Mic, Send, MicOff } from 'lucide-react';
import { startSpeechRecognition, stopSpeechRecognition } from '../utils/speechToText';

interface VoiceInputProps {
  onSubmit: (text: string) => void;
}

const VoiceInput: React.FC<VoiceInputProps> = ({ onSubmit }) => {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isRecordingSupported, setIsRecordingSupported] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  const toggleVoiceInput = async () => {
    if (!isListening) {
      try {
        setIsListening(true);
        const result = await startSpeechRecognition('or-IN'); // Odia language code
        if (result) {
          setInput(result);
        }
      } catch (error) {
        console.error('Speech recognition error:', error);
        setIsRecordingSupported(false);
      } finally {
        setIsListening(false);
      }
    } else {
      stopSpeechRecognition();
      setIsListening(false);
    }
  };

  return (
    <div className="p-6 border-t border-white/20">
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="ଆପଣଙ୍କର ଉତ୍ତର ଏଠାରେ ଟାଇପ୍ କରନ୍ତୁ..."
            className="w-full px-4 py-3 pr-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
          />
          
          {/* Voice Input Button */}
          {isRecordingSupported && (
            <button
              type="button"
              onClick={toggleVoiceInput}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-green-500 hover:bg-green-600 hover:scale-105'
              }`}
            >
              {isListening ? (
                <MicOff className="w-5 h-5 text-white" />
              ) : (
                <Mic className="w-5 h-5 text-white" />
              )}
            </button>
          )}
        </div>
        
        {/* Send Button */}
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-full text-white font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
      
      {isListening && (
        <div className="mt-3 text-center">
          <p className="text-green-300 text-sm animate-pulse">
            ଶୁଣୁଛି... କୃପଯା କହନ୍ତୁ
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceInput;