
import { useState, useEffect, useCallback } from 'react';
import { useConversation } from '@11labs/react';

export const useVoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const conversation = useConversation();

  const startListening = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsListening(true);
      // Initialize voice recognition
      await conversation.startSession({
        agentId: 'YOUR_AGENT_ID', // You'll need to set up an agent in ElevenLabs
      });
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  }, [conversation]);

  const stopListening = useCallback(() => {
    setIsListening(false);
    conversation.endSession();
  }, [conversation]);

  useEffect(() => {
    return () => {
      if (isListening) {
        stopListening();
      }
    };
  }, [isListening, stopListening]);

  return {
    isListening,
    startListening,
    stopListening,
  };
};
