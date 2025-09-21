export const startSpeechRecognition = (language: string = 'or-IN'): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      reject(new Error('Speech recognition not supported'));
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = language;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      resolve(transcript);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      reject(new Error(`Speech recognition error: ${event.error}`));
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
    };

    try {
      recognition.start();
    } catch (error) {
      reject(error);
    }
  });
};

export const stopSpeechRecognition = (): void => {
  // This would stop ongoing recognition if we stored the instance
  console.log('Stopping speech recognition...');
};

// Type definitions for better TypeScript support
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}