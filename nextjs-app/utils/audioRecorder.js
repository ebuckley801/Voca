"use client"

import React, { useState, useRef } from 'react';  // React core and hooks

const audioRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const toggleRecording = async () => {
        if (isRecording) {
            // Stop recording
            if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
                mediaRecorderRef.current.stop();
                mediaRecorderRef.current.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    setAudioUrl(audioUrl);
                    console.log('Recording stopped');
                    audioChunksRef.current = [];
                };
            }
            setIsRecording(false);
        } else {
            // Start recording
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                mediaRecorderRef.current = new MediaRecorder(stream);
                audioChunksRef.current = [];

                mediaRecorderRef.current.ondataavailable = (event) => {
                    audioChunksRef.current.push(event.data);
                };

                mediaRecorderRef.current.start();
                console.log('Recording started');
                setIsRecording(true);
            } catch (error) {
                console.error('Failed to start recording:', error);
            }
        }
    };

    return (
        <div>
            <button onClick={toggleRecording} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </button>
            {audioUrl && <audio src={audioUrl} controls />}
        </div>
    );
};

export default audioRecorder;
