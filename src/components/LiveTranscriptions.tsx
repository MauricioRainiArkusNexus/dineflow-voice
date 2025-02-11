import { useEffect } from "react";
import {
    TranscribeStreamingClient,
    StartStreamTranscriptionCommand,
    LanguageCode
} from '@aws-sdk/client-transcribe-streaming';
import pEvent from 'p-event';
import {
    RecordingProperties,
    MessageDataType,
    LiveTranscriptionProps,
    AWSCredentials
} from "../types";

const sampleRate = import.meta.env.VITE_TRANSCRIBE_SAMPLING_RATE;
const language = import.meta.env.VITE_TRANSCRIBE_LANGUAGE_CODE as LanguageCode;
const audiosource = import.meta.env.VITE_TRANSCRIBE_AUDIO_SOURCE;

const AWS_ACCESS_KEY_ID = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
const AWS_REGION = import.meta.env.VITE_AWS_REGION;

const startStreaming = async (
    handleTranscribeOutput: (data: string, partial: boolean, transcriptionClient: TranscribeStreamingClient, mediaRecorder: AudioWorkletNode) => void,
    currentCredentials: AWSCredentials,
) => {
    const audioContext = new window.AudioContext();
    let stream: MediaStream;

    if (audiosource === 'ScreenCapture') {
        stream = await window.navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
        });
    } else {
        stream = await window.navigator.mediaDevices.getUserMedia({
            video: false,
            audio: true,
        });
    }

    const source1 = audioContext.createMediaStreamSource(stream);

    const recordingprops: RecordingProperties = {
        numberOfChannels: 1,
        sampleRate: audioContext.sampleRate,
        maxFrameCount: audioContext.sampleRate * 1 / 10
    };

    try {
        await audioContext.audioWorklet.addModule('./worklets/recording-processor.js');
    } catch (error) {
        console.log(`Add module error ${error}`);
    }
    const mediaRecorder = new AudioWorkletNode(
        audioContext,
        'recording-processor',
        {
            processorOptions: recordingprops,
        },
    );

    const destination = audioContext.createMediaStreamDestination();

    mediaRecorder.port.postMessage({
        message: 'UPDATE_RECORDING_STATE',
        setRecording: true,
    });

    source1.connect(mediaRecorder).connect(destination);
    mediaRecorder.port.onmessageerror = (error) => {
        console.log(`Error receving message from worklet ${error}`);
    };

    const audioDataIterator = pEvent.iterator<'message', MessageEvent<MessageDataType>>(mediaRecorder.port, 'message');

    const getAudioStream = async function* () {
        for await (const chunk of audioDataIterator) {
            if (chunk.data.message === 'SHARE_RECORDING_BUFFER') {
                const abuffer = pcmEncode(chunk.data.buffer[0]);
                const audiodata = new Uint8Array(abuffer);
                yield {
                    AudioEvent: {
                        AudioChunk: audiodata,
                    },
                };
            }
        }
    };

    const transcribeClient = new TranscribeStreamingClient({
        region: AWS_REGION,
        credentials: {
            accessKeyId: AWS_ACCESS_KEY_ID,
            secretAccessKey: AWS_SECRET_ACCESS_KEY
        },
    });

    const command = new StartStreamTranscriptionCommand({
        LanguageCode: language,
        MediaEncoding: 'pcm',
        MediaSampleRateHertz: sampleRate,
        AudioStream: getAudioStream(),
    });
    const data = await transcribeClient.send(command);
    console.log('Transcribe sesssion established ', data.SessionId);

    if (data.TranscriptResultStream) {
        for await (const event of data.TranscriptResultStream) {
            if (event?.TranscriptEvent?.Transcript) {
                for (const result of event?.TranscriptEvent?.Transcript.Results || []) {
                    if (result?.Alternatives && result?.Alternatives[0].Items) {
                        let completeSentence = ``;
                        for (let i = 0; i < result?.Alternatives[0].Items?.length; i++) {
                            completeSentence += ` ${result?.Alternatives[0].Items[i].Content}`;
                        }
                        handleTranscribeOutput(
                            completeSentence,
                            result.IsPartial || false,
                            transcribeClient,
                            mediaRecorder,
                        );
                    }
                }
            }
        }
    }
};

const stopStreaming = async (
    mediaRecorder: AudioWorkletNode,
    transcribeClient: { destroy: () => void; }
) => {
    if (mediaRecorder) {
        mediaRecorder.port.postMessage({
            message: 'UPDATE_RECORDING_STATE',
            setRecording: false,
        });
        mediaRecorder.port.close();
        mediaRecorder.disconnect();
    } else {
        console.log('no media recorder available to stop');
    }

    if (transcribeClient) {
        transcribeClient.destroy();
    }
};

const pcmEncode = (input: Float32Array) => {
    const buffer = new ArrayBuffer(input.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < input.length; i++) {
        const s = Math.max(-1, Math.min(1, input[i]));
        view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    }
    return buffer;
};

const LiveTranscriptions = (props: LiveTranscriptionProps) => {
    const {
        transcribeStatus,
        mediaRecorder,
        transcriptionClient,
        currentCredentials,
        setMediaRecorder,
        setTranscriptionClient,
        setTranscript,
    } = props;

    const onTranscriptionDataReceived = (
        data: string,
        partial: boolean,
        transcriptionClient: TranscribeStreamingClient,
        mediaRecorder: AudioWorkletNode,
    ) => {
        setTranscript({
            channel: '0',
            partial: partial,
            text: data,
        });
        setMediaRecorder(mediaRecorder);
        setTranscriptionClient(transcriptionClient);
    };

    const startRecording = async () => {
        if (!currentCredentials) {
            console.error('credentials not found');
            return;
        }
        try {
            await startStreaming(
                onTranscriptionDataReceived,
                currentCredentials,
            );
        } catch (error) {
            alert(`An error occurred while recording: ${error}`);
            await stopRecording();
        }
    };

    const stopRecording = async () => {
        if (mediaRecorder && transcriptionClient) {
            await stopStreaming(mediaRecorder, transcriptionClient);
        } else {
            console.log('no media recorder');
        }
    };

    async function toggleTranscribe() {

        if (transcribeStatus) {
            console.log('startRecording');
            await startRecording();
        } else {
            console.log('stopRecording');
            await stopRecording();
        }
    }

    useEffect(() => {
        toggleTranscribe();
    }, [transcribeStatus]);

    return null;
}

export default LiveTranscriptions;
