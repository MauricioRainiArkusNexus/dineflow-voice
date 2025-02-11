
import { TranscribeStreamingClient } from '@aws-sdk/client-transcribe-streaming';
import { ICredentials } from "@aws-amplify/core";

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
  currentCredentials: ICredentials;
  setMediaRecorder: React.Dispatch<React.SetStateAction<AudioWorkletNode | undefined>>;
  setTranscriptionClient: React.Dispatch<React.SetStateAction<any>>;
  setTranscript: React.Dispatch<React.SetStateAction<Transcript | undefined>>;
}
