
import { TranscribeStreamingClient } from '@aws-sdk/client-transcribe-streaming';
import { Credentials } from 'aws-amplify/auth';

export interface Transcript {
  channel: string;
  text: string;
  partial: boolean;
}

export interface RecordingProperties {
  numberOfChannels: number;
  sampleRate: number;
  maxFrameCount: number;
}

export interface MessageDataType {
  message: string;
  buffer?: Float32Array[];
}

export interface LiveTranscriptionProps {
  transcribeStatus: boolean;
  mediaRecorder: AudioWorkletNode | undefined;
  transcriptionClient: any;
  currentCredentials: Credentials;
  setMediaRecorder: React.Dispatch<React.SetStateAction<AudioWorkletNode | undefined>>;
  setTranscriptionClient: React.Dispatch<React.SetStateAction<any>>;
  setTranscript: React.Dispatch<React.SetStateAction<Transcript | undefined>>;
}
