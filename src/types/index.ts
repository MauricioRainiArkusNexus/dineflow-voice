
import { TranscribeStreamingClient } from '@aws-sdk/client-transcribe-streaming';

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

export interface AWSCredentials {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken?: string;
}

export interface LiveTranscriptionProps {
  transcribeStatus: boolean;
  mediaRecorder: AudioWorkletNode | undefined;
  transcriptionClient: any;
  currentCredentials: AWSCredentials;
  setMediaRecorder: React.Dispatch<React.SetStateAction<AudioWorkletNode | undefined>>;
  setTranscriptionClient: React.Dispatch<React.SetStateAction<any>>;
  setTranscript: React.Dispatch<React.SetStateAction<Transcript | undefined>>;
}
