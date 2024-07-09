"use client";
import React, { useState } from 'react';
import { FetchConjugations } from '../../utils/prompter';
import AudioRecorder from '@/utils/audioRecorder';
import OpenAI from 'openai';
import levenshtein from 'fast-levenshtein';

const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

export default function Start() {
  const [conjugationText, setConjugationText] = useState('');
  const [transcriptionText, setTranscriptionText] = useState('');
  const [audioFile, setAudioFile] = useState(null);
  const [comparisonResult, setComparisonResult] = useState('');

  const handleFetchConjugations = async () => {
    const result = await FetchConjugations();
    setConjugationText(result);
  };

  const handleTranscribe = async () => {
    console.log('Starting transcription...');
    if (!audioFile) {
      console.error('No audio file selected');
      return;
    }

    try {
      const transcription = await openai.audio.transcriptions.create({
        file: audioFile,
        model: "whisper-1",
        language: "it"
      });

      console.log('Transcription result:', transcription.text);
      setTranscriptionText(transcription.text);
      compareTexts(conjugationText, transcription.text);
    } catch (error) {
      console.error('Error during transcription:', error);
    }
  };

  const compareTexts = (text1, text2) => {
    const distance = levenshtein.get(text1, text2);
    const similarity = 1 - distance / Math.max(text1.length, text2.length);
    setComparisonResult(similarity > 0.8 ? 'Correct' : 'Incorrect');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file);
    }
  };

  const handleRecordingComplete = (file) => {
    setAudioFile(file);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="max-w-3xl w-full bg-white rounded-xl shadow-lg p-8 md:p-12">
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-2xl font-bold text-blue-500">Italian Verb Conjugations: Essere (To Be)</h2>
            <button onClick={handleFetchConjugations} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Load Conjugations
            </button>
            <AudioRecorder onRecordingComplete={handleRecordingComplete} />
            <input type="file" accept=".flac,.m4a,.mp3,.mp4,.mpeg,.mpga,.oga,.ogg,.wav,.webm" onChange={handleFileChange} />
            <button onClick={handleTranscribe} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
              Transcribe Audio
            </button>
            <p style={{ color: 'black' }}>{conjugationText}</p>
            <p style={{ color: 'black' }}>{transcriptionText}</p>
            <p style={{ color: comparisonResult === 'Correct' ? 'green' : 'red' }}>{comparisonResult}</p>
          </div>
        </div>
      </div>
    </>
  );
}