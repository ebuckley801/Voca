"use client"

import React, { useState, useCallback } from 'react';  // React core and hooks
import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});


const AudioRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newMediaRecorder = new MediaRecorder(stream);
      newMediaRecorder.ondataavailable = (event) => {
        setAudioChunks((prevChunks) => [...prevChunks, event.data]);
      };
      newMediaRecorder.start();
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
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioFile = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
      onRecordingComplete(audioFile);
    }
  }, [mediaRecorder, audioChunks, onRecordingComplete]);

  return (
    <div>
      {!isRecording && <button onClick={startRecording}>Start Recording</button>}
      {isRecording && <button onClick={stopRecording}>Stop Recording</button>}
    </div>
  );
};

export default AudioRecorder;
