import { useEffect } from "react";
import { LiveTranscriptionProps } from "../types";

const LiveTranscriptions = (props: LiveTranscriptionProps) => {
  const {
    transcribeStatus,
    mediaRecorder,
    transcriptionClient,
    setMediaRecorder,
    setTranscriptionClient,
    setTranscript,
  } = props;

  useEffect(() => {
    console.log("Transcription status:", transcribeStatus);
  }, [transcribeStatus]);

  return null;
};

export default LiveTranscriptions;
