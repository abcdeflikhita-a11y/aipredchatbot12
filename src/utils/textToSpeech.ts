export const playOdiaText = (text: string): void => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Try to set Odia language
    utterance.lang = 'or-IN'; // Odia language code
    utterance.rate = 0.8; // Slightly slower for better comprehension
    utterance.pitch = 1;
    utterance.volume = 0.8;
    
    // Fallback to available voices
    const voices = window.speechSynthesis.getVoices();
    const odiaVoice = voices.find(voice => 
      voice.lang.includes('or') || 
      voice.lang.includes('hi') || // Hindi as fallback
      voice.name.toLowerCase().includes('indian')
    );
    
    if (odiaVoice) {
      utterance.voice = odiaVoice;
    }
    
    // Error handling
    utterance.onerror = (event) => {
      console.warn('Speech synthesis error:', event.error);
    };
    
    utterance.onend = () => {
      console.log('Speech synthesis completed');
    };
    
    // Speak the text
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn('Speech synthesis not supported in this browser');
  }
};

// Load voices when available
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    console.log('Voices loaded:', window.speechSynthesis.getVoices().length);
  };
}