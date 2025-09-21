import React, { useState, useEffect, useRef } from 'react';
import MessageBubble from './MessageBubble';
import VoiceInput from './VoiceInput';
import { playOdiaText } from '../utils/textToSpeech';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [userInputs, setUserInputs] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const chatFlow = [
    {
      text: "ଆଗ୍ରି AI କୁ ସ୍ୱାଗତ — ଆପଣଙ୍କ ସ୍ମାର୍ଟ କୃଷିର ସହଭାଗୀ। ଫସଲ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ, ମାଟି ବିଶ୍ଳେଷଣ ଏବଂ ସମ୍ପଦର ସର୍ବୋତ୍କୃଷ୍ଟ ବ୍ୟବହାର ସମ୍ପର୍କିତ ତୁରନ୍ତ ଅବଧାରଣା ପାଆନ୍ତୁ।",
      requiresInput: false
    },
    {
      text: "ଆପଣଙ୍କୁ ସର୍ବୋତ୍କୃଷ୍ଟ ଉତ୍ପାଦନ ପୂର୍ବାନୁମାନ ଏବଂ ପରାମର୍ଶ ଦେବା ପାଇଁ, ମୁଁ ଆପଣଙ୍କ ଜମି ବିଷୟରେ କିଛି ସୂଚନା ଆବଶ୍ୟକ।\nଦୟାକରି ଆପଣଙ୍କ ଜମିର ଆକାର (ହେକ୍ଟରରେ) କୁହିପାରିବେ କି?",
      requiresInput: true
    },
    {
      text: "ଆପଣଙ୍କ ଖେତ କେଉଁଠି ଅବସ୍ଥିତ?",
      requiresInput: true
    },
    {
      text: "ଆପଣ କେଉଁ ଫସଲ ଚାଷ କରୁଛନ୍ତି?",
      requiresInput: true
    },
    {
      text: "ଦୟାକରି ଥୋଡ଼ା ସମୟ ଦିଅନ୍ତୁ, ମୁଁ ଆପଣଙ୍କର ପୂର୍ବାନୁମାନ ଉତ୍ପାଦନ ଏବଂ ପରାମର୍ଶ ଗଣନା କରୁଛି।",
      requiresInput: false
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, isBot: boolean) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
    
    if (isBot) {
      // Play TTS for bot messages
      setTimeout(() => {
        playOdiaText(text);
      }, 500);
    }
  };

  const handleUserInput = (input: string) => {
    if (!input.trim()) return;
    
    // Add user message
    addMessage(input, false);
    
    // Store user input
    const newInputs = [...userInputs, input];
    setUserInputs(newInputs);
    
    // Move to next step
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    
    // Add bot response after a delay
    setTimeout(() => {
      if (nextStep < chatFlow.length) {
        if (nextStep === chatFlow.length - 1) {
          // Processing step
          setIsProcessing(true);
          addMessage(chatFlow[nextStep].text, true);
          
          // Simulate processing time
          setTimeout(() => {
            setIsProcessing(false);
            generatePrediction(newInputs);
          }, 3000);
        } else {
          addMessage(chatFlow[nextStep].text, true);
        }
      }
    }, 1000);
  };

  const generatePrediction = (inputs: string[]) => {
    const [landSize, location, crop] = inputs;
    const predictionText = `ଆପଣଙ୍କ ${landSize} ହେକ୍ଟର ଜମିରେ ${crop} ଚାଷ ପାଇଁ ପୂର୍ବାନୁମାନ:\n\n• ଆଶାତିତ ଉତ୍ପାଦନ: ୨୫-୩୦ କୁଇଣ୍ଟାଲ\n• ସର୍ବୋତ୍ତମ ରୋପଣ ସମୟ: ଅକ୍ଟୋବର-ନଭେମ୍ବର\n• ସାର ସୁପାରିଶ: NPK ୧୦:୨୬:୨୬\n• ଜଳସେଚନ: ସପ୍ତାହକୁ ୨ ଥର\n\nଅଧିକ ସହାୟତା ଆବଶ୍ୟକ ହେଲେ ପଚାରନ୍ତୁ!`;
    
    addMessage(predictionText, true);
  };

  useEffect(() => {
    // Start conversation with welcome message
    if (messages.length === 0) {
      addMessage(chatFlow[0].text, true);
      
      // Add first question after delay
      setTimeout(() => {
        addMessage(chatFlow[1].text, true);
        setCurrentStep(1);
      }, 3000);
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Chat Container */}
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Messages Area */}
        <div className="h-96 md:h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.text}
              isBot={message.isBot}
              timestamp={message.timestamp}
            />
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-green-500/20 backdrop-blur-sm rounded-2xl px-4 py-3 border border-green-400/30">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        {currentStep > 0 && currentStep < chatFlow.length - 1 && chatFlow[currentStep]?.requiresInput && (
          <VoiceInput onSubmit={handleUserInput} />
        )}
      </div>
    </div>
  );
};

export default ChatInterface;