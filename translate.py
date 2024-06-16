#Translates the input audio file to text using the Google Cloud Speech-to-Text API 
#Connects to react front-end using Flask
import io
import os
from google.cloud import speech
from flask import Flask, request, jsonify


# Instantiates a client
client = speech.SpeechClient()

app = Flask(__name__)

@app.route('/translate', methods=['POST'])

def translate():
    # The name of the audio file to transcribe
    file_name = request.files['audio']
    content = file_name.read()
    audio = speech.RecognitionAudio(content="./Ciao.m4a")
    config = speech.RecognitionConfig(
        encoding=speech.RecognitionConfig.AudioEncoding.LINEAR16,
        sample_rate_hertz=16000,
        #detects italian language
        language_code="it-IT",
    )

    # Detects speech in the audio file
    response = client.recognize(config=config, audio=audio)
    for result in response.results:
        return result.alternatives[0].transcript
    
#main, runs app and checks transcription against the expected output
if __name__ == '__main__':
    app.run(debug=True)
    #expected output
    expected_output = "Ciao, come stai?"
    #transcription
    output = translate()
    #checks if the transcription matches the expected output
    if output == expected_output:
        print("Test passed")
    else:
        print("Test failed")
        print("Expected output: ", expected_output)

#eof