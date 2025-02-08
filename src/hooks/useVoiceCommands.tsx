
import { useState, useEffect, useCallback } from 'react';
import { useConversation } from '@11labs/react';
import { useToast } from '@/components/ui/use-toast';

export const useVoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const conversation = useConversation();
  const { toast } = useToast();

  const startListening = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsListening(true);
      
      // Initialize voice recognition with ElevenLabs
      await conversation.startSession({
        agentId: 'KzhqQGKZ0aVtYnrtTXkW',
        overrides: {
          agent: {
            language: 'en',
          },
        },
      });

    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Error",
        description: "Failed to access microphone. Please check your permissions.",
        variant: "destructive",
      });
    }
  }, [conversation, toast]);

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
    transcript,
    conversation
  };
};
