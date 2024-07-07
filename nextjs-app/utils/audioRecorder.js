"use client"

import React, { useState, useCallback } from 'react';  // React core and hooks
import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true,
});


const AudioRecorder = () => {
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [transcription, setTranscription] = useState('');
  const [audioChunks, setAudioChunks] = useState([]);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      let options = { mimeType: 'audio/webm; codecs=opus' };
      const newMediaRecorder = new MediaRecorder(stream, options);
      newMediaRecorder.ondataavailable = (event) => {
        setAudioChunks(prevChunks => [...prevChunks, event.data]);
      }; 
      console.log("Recording started");
      newMediaRecorder.start();
      setMediaRecorder(newMediaRecorder);
      setIsRecording(true);
    } catch (err) {
      console.error('Error accessing media devices:', err);
    }
  }, []);

  const stopRecording = useCallback(async () => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      setAudioBlob(blob);
      const transcriptionResult = await sendAudioToServer(blob);
      setTranscription(transcriptionResult);
      console.log(transcriptionResult);
    }
  }, [mediaRecorder, audioChunks]);

  // i know error happening here
  const sendAudioToServer = async (audioBlob) => {
    console.log("Sending audio to server");
    const formData = new FormData();
    formData.append('file', audioBlob, 'audio.webm');
  
    try {
        // error is happening here, maybe missing file name
        // could just have function that transcribes, don't even need to fetch
      const response = await fetch('http://localhost:3000/api/processAudio', {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
  
      const result = await response.json();
      console.log('Transcription result:', result.transcription);
      return result.transcription;
    } catch (error) {
      console.error('Error sending audio to server:', error);
      return '';
    }
  };

  const transcribeAudioWithOpenAI = async (audioBlob) => {
    try {
      const buffer = await audioBlob.arrayBuffer();
      const response = await openai.createTranscription({
        model: 'whisper-1',
        file: buffer,
        fileType: 'audio/webm',
        language: 'it',
      });
      return response.data.transcription;
    } catch (error) {
      console.error('Error transcribing audio:', error);
      return '';
    }
  };

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