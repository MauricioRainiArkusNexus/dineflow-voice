
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, MicOff } from 'lucide-react';
import { Transcript } from '@/types';
import { Auth } from 'aws-amplify';
import { ICredentials } from "@aws-amplify/core";
import LiveTranscriptions from '@/components/LiveTranscriptions';
import awsConfig from '@/config/aws-exports';
import { useToast } from '@/components/ui/use-toast';

Auth.configure(awsConfig);

const VoiceTranscription = () => {
  const [currentCredentials, setCurrentCredentials] = useState<ICredentials>({
    accessKeyId: "",
    authenticated: false,
    expiration: undefined,
    identityId: "",
    secretAccessKey: "",
    sessionToken: ""
  });
  const [isListening, setIsListening] = useState(false);
  const [lines, setLines] = useState<Transcript[]>([]);
  const [currentLine, setCurrentLine] = useState<Transcript[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<AudioWorkletNode>();
  const [transcriptionClient, setTranscriptionClient] = useState<any>(null);
  const [transcript, setTranscript] = useState<Transcript>();
  const { toast } = useToast();

  async function getAuth() {
    try {
      const currCreds = await Auth.currentUserCredentials();
      setCurrentCredentials(currCreds);
    } catch (error) {
      console.error('Error getting credentials:', error);
      toast({
        title: "Authentication Error",
        description: "Failed to get AWS credentials. Please try logging in again.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
    if (transcript) {
      if (transcript.partial) {
        setCurrentLine([transcript]);
      } else {
        setLines(prev => [...prev, transcript]);
        setCurrentLine([]);
      }
    }
  }, [transcript]);

  const handleTranscribe = () => {
    setIsListening(!isListening);
    console.log(isListening ? "Stopping transcription" : "Starting transcription");
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
            disabled={!currentCredentials.authenticated}
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

      <LiveTranscriptions
        currentCredentials={currentCredentials}
        mediaRecorder={mediaRecorder}
        setMediaRecorder={setMediaRecorder}
        setTranscriptionClient={setTranscriptionClient}
        transcriptionClient={transcriptionClient}
        transcribeStatus={isListening}
        setTranscript={setTranscript}
      />
    </div>
  );
};

export default VoiceTranscription;
