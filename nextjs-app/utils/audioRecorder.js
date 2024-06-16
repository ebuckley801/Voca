import React, { useCallback, useState } from 'react';
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const AudioRecorder = () => {
  const [audioBlob, setAudioBlob] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [transcription, setTranscription] = useState('');

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const newMediaRecorder = new MediaRecorder(stream);

      newMediaRecorder.start();

      const audioChunks = [];
      newMediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

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

      const audioChunks = [];
      mediaRecorder.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      setAudioBlob(audioBlob);
      const audioUrl = URL.createObjectURL(audioBlob);
      const response = await fetch(audioUrl);
      const audioBuffer = await response.arrayBuffer();
      const base64Audio = btoa(String.fromCharCode(...new Uint8Array(audioBuffer)));
      const openAIResponse = await fetch('https://api.openai.com/v1/audio/transcriptions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "whisper-1",
          audio: {
            data: base64Audio,
            format: "webm"
          }
        })
      });
      const transcriptionData = await openAIResponse.json();
      setTranscription(transcriptionData.text);

      // Save transcription to Supabase
      const { data, error } = await supabase
        .from('transcriptions')
        .insert([
          { transcription: transcriptionData.text }
        ]);

      if (error) console.error('Error saving transcription:', error);
      else console.log('Transcription saved:', data);
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
          <p>Transcription: {transcription || 'Transcribing...'}</p>
        </div>
      )}
    </div>
  );
};

export default AudioRecorder;