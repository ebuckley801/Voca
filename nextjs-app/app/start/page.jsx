"use client";
import React, { useState } from 'react';
import { FetchConjugations } from '../../utils/prompter';
import AudioRecorder from '../../utils/audioRecorder'; // This should now correctly match the file name

export default function Start() {
  const [conjugationText, setConjugationText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchConjugations = async () => {
    setIsLoading(true);
    setConjugationText(''); // Clear previous text
    try {
      const data = await FetchConjugations();
      setConjugationText(data);
    } catch (error) {
      console.error('Error fetching conjugations:', error);
      setConjugationText('Failed to load conjugations');
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
          <div className="flex flex-col items-center space-y-6">
            <h2 className="text-2xl font-bold text-blue-500">Italian Verb Conjugations: </h2>
            <button 
              onClick={handleFetchConjugations} 
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {isLoading ? 'Loading...' : 'Load Conjugations'}
            </button>
            <p style={{color: 'black'}}>{conjugationText}</p>
            <audioRecorder />
          </div>
      </div>
    </>
  );
}