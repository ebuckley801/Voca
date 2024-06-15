#Translates the input audio file to text using the Google Cloud Speech-to-Text API 
#Connects to react front-end using Flask
import io
import os
from google.cloud import speech
from flask import Flask, request, jsonify



