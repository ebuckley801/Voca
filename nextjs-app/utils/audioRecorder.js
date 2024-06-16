import React, { useCallback, useState } from 'react';

const AudioRecorder = () => {
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newMediaRecorder = new MediaRecorder(stream);

      newMediaRecorder.start();

      const audioChunks = [];
      newMediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      newMediaRecorder.addEventListener('stop', () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
        setAudioBlob(audioBlob);
      });

      setMediaRecorder(newMediaRecorder);
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  }, [mediaRecorder]);

  return (
    <div>
      {!isRecording && (
        <button onClick={startRecording}>Start Recording</button>
      )}
      {isRecording && (
        <button onClick={stopRecording}>Stop Recording</button>
      )}
      {audioBlob && (
        <div>
          <audio src={URL.createObjectURL(audioBlob)} controls />
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;