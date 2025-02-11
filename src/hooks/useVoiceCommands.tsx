
import { useState, useCallback } from 'react';
import { useToast } from '@/components/ui/use-toast';

export const useVoiceCommands = () => {
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();

  const startListening = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsListening(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      toast({
        title: "Error",
        description: "Failed to access microphone. Please check your permissions.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const stopListening = useCallback(() => {
    setIsListening(false);
  }, []);

  return {
    isListening,
    startListening,
    stopListening
  };
};
