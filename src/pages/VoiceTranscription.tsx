
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff } from 'lucide-react';
import { Transcript } from '@/types';

const VoiceTranscription = () => {
  const [isListening, setIsListening] = useState(false);
  const [lines, setLines] = useState<Transcript[]>([]);
  const [currentLine, setCurrentLine] = useState<Transcript[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<AudioWorkletNode>();
  const [transcriptionClient, setTranscriptionClient] = useState<any>(null);

  const handleTranscribe = () => {
    setIsListening(!isListening);
    console.log(isListening ? "Stopping transcription" : "Starting transcription");
  };

  const handleTranscript = (transcript: Transcript) => {
    if (transcript.partial) {
      setCurrentLine([transcript]);
    } else {
      setLines(prev => [...prev, transcript]);
      setCurrentLine([]);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-foreground">Voice Transcription</h1>
          <Button
            onClick={handleTranscribe}
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
        </div>
        
        <Card className="p-6">
          <div className="min-h-[400px] max-h-[600px] overflow-y-auto space-y-4">
            {lines.map((line, index) => (
              <div 
                key={index}
                className="bg-secondary/10 p-3 rounded-lg"
              >
                <strong>Channel {line.channel}</strong>: {line.text}
              </div>
            ))}
            {currentLine.map((line, index) => (
              <div 
                key={`current-${index}`}
                className="bg-primary/10 p-3 rounded-lg animate-pulse"
              >
                <strong>Channel {line.channel}</strong>: {line.text}
              </div>
            ))}
            {isListening && currentLine.length === 0 && (
              <div className="text-center text-muted-foreground">
                Listening... Speak to start transcription
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VoiceTranscription;
