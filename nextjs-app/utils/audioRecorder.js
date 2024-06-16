"use server"
import React, { useCallback, useState } from 'react';
import { OpenAI } from 'openai';
import { createClient } from '@supabase/supabase-js';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegStatic.path);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const openai = new OpenAI({ apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

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

      const transcriptionResult = await sendAudioToOpenAI(blob);
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

const convertBlobToSupportedFormat = async (blob) => {
  if (!ffmpeg.isLoaded()) await ffmpeg.load();
  const data = new Uint8Array(await blob.arrayBuffer());
  ffmpeg.FS('writeFile', 'input.webm', data);

  // Convert to MP3
  await ffmpeg.run('-i', 'input.webm', '-b:a', '192k', 'output.mp3');

  const mp3Data = ffmpeg.FS('readFile', 'output.mp3');
  return new Blob([mp3Data.buffer], { type: 'audio/mpeg' });
};

const sendAudioToOpenAI = async (audioBlob) => {
  const formData = new FormData();
  formData.append("file", audioBlob, "audio.mp3");
  formData.append("model", "whisper-1"); // Add the model parameter here

  try {
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
      },
      body: formData
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error processing transcription:', error);
    throw error;
  }
};

export default AudioRecorder;

// pages/api/processAudio.js
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Ensure FFmpeg is loaded
      if (!ffmpeg.isLoaded()) await ffmpeg.load();

      // Assuming the audio file is sent as a binary in the request body
      const audioData = req.body;
      ffmpeg.FS('writeFile', 'input.webm', audioData);

      // Convert to desired format, e.g., MP3
      await ffmpeg.run('-i', 'input.webm', '-b:a', '192k', 'output.mp3');
      const mp3Data = ffmpeg.FS('readFile', 'output.mp3');

      // Convert Uint8Array to Buffer for sending
      const mp3Buffer = Buffer.from(mp3Data.buffer);

      // Set appropriate headers and send the file
      res.setHeader('Content-Type', 'audio/mpeg');
      res.send(mp3Buffer);
    } catch (error) {
      console.error('Error processing audio:', error);
      res.status(500).json({ error: 'Failed to process audio' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}