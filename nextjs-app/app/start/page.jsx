"use client";
import React, { useState } from 'react';
import { FetchConjugations } from '../../utils/prompter';
import AudioRecorder from '@/utils/audioRecorder';
export default function Start() {
  const [conjugationText, setConjugationText] = useState('');
  const handleFetchConjugations = () => {
    setConjugationText(FetchConjugations);  // Pass setConjugationText directly
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
            <AudioRecorder />
            <p style={{color: 'black'}}>{conjugationText}</p>
          </div>
        </div>
      </div>
    </>
  );
}