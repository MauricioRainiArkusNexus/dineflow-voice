
class RecordingProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    this._bufferSize = options.processorOptions.maxFrameCount;
    this._numberOfChannels = options.processorOptions.numberOfChannels;
    this.initBuffer();
    this._frameCount = 0;
    this._isRecording = false;
  }

  initBuffer() {
    this._buffer = [];
    for (let i = 0; i < this._numberOfChannels; i++) {
      this._buffer.push(new Float32Array(this._bufferSize));
    }
  }

  get bufferSize() {
    return this._bufferSize;
  }

  process(inputs, outputs, parameters) {
    if (this._isRecording) {
      const input = inputs[0];
      for (let channel = 0; channel < this._numberOfChannels; channel++) {
        for (let i = 0; i < input[channel].length; i++) {
          this._buffer[channel][this._frameCount + i] = input[channel][i];
        }
      }

      this._frameCount += input[0].length;

      if (this._frameCount >= this._bufferSize) {
        this.port.postMessage({
          message: 'SHARE_RECORDING_BUFFER',
          buffer: this._buffer,
        });
        this._frameCount = 0;
        this.initBuffer();
      }
    }
    return true;
  }

  port.onmessage = (e) => {
    if (e.data.message === 'UPDATE_RECORDING_STATE') {
      this._isRecording = e.data.setRecording;
      if (this._isRecording) {
        this._frameCount = 0;
        this.initBuffer();
      }
    }
  }
}

registerProcessor('recording-processor', RecordingProcessor);
