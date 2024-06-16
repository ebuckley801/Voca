"use client"

import React, { useState, useCallback } from 'react';  // React core and hooks
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
      const { data, error } = await supabase
        .from('Language_Questions')
        .insert([{ Response: transcriptionResult }]);

      if (error) {
        console.error('Error saving transcription:', error);
      } else {
        console.log('Transcription saved:', data);
      }
    }
  }, [mediaRecorder, audioChunks]);

  const sendAudioToServer = async (audioBlob) => {
    const formData = new FormData();
    formData.append('file', audioBlob);

    try {
      const response = await fetch('../pages/api/processAudio', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const processedAudioBlob = await response.blob();
        console.log(URL.createObjectURL(processedAudioBlob));
      } else {
        throw new Error('Failed to process audio');
      }
    } catch (error) {
      console.error('Error sending audio to server:', error);
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