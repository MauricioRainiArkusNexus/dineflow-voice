
import React, { useState } from 'react';
import { useVoiceCommands } from '@/hooks/useVoiceCommands';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff } from 'lucide-react';

const VoiceTranscription = () => {
  const [transcript, setTranscript] = useState<string>('');
  const { isListening, startListening, stopListening } = useVoiceCommands();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Voice Transcription</h1>
        
        <Card className="p-6">
          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={() => isListening ? stopListening() : startListening()}
              className={`flex items-center gap-2 ${
                isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'
              }`}
              size="lg"
            >
              {isListening ? (
                <>
                  <MicOff className="w-5 h-5" />
                  Stop Recording
                </>
              ) : (
                <>
                  <Mic className="w-5 h-5" />
                  Start Recording
                </>
              )}
            </Button>
            
            <div className="w-full mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                {isListening ? 'Listening...' : 'Click the button to start recording'}
              </p>
              <div className="min-h-[200px] w-full p-4 bg-muted rounded-lg">
                <p className="text-foreground">{transcript || 'Your transcription will appear here...'}</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VoiceTranscription;
