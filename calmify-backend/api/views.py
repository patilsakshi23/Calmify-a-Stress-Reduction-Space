from django.http import JsonResponse, HttpResponse
from tensorflow import keras
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from rest_framework.decorators import api_view

import os
import pickle
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from .retrain_model import retrain_model  # Import the retraining logic

# Paths to files
MODEL_PATH = 'text_model/Text_Prediction_Model.keras'
TOKENIZER_PATH = 'text_model/tokenizer_stress.pkl'
TEXT_DATASET = 'text_model/text_dataset.csv'
MAX_LEN = 100  # Max length used during training

# Load the trained model and tokenizer
with open(TOKENIZER_PATH, 'rb') as file:
    text_tokenizer = pickle.load(file)
text_model = load_model(MODEL_PATH)

def home(request):
    return HttpResponse("Welcome to the Stress Detection API!")

@api_view(['POST'])
def upload_video(request):
    file = request.FILES['file']
    video_path = os.path.join('uploads', file.name)
    with open(video_path, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)

    audio_path = extract_audio(video_path)
    text = convert_audio_to_text(audio_path)

    return JsonResponse({"text": text})

def extract_audio(video_path):
    from moviepy.editor import VideoFileClip
    video = VideoFileClip(video_path)
    audio_path = video_path.replace('.mp4', '.wav')
    video.audio.write_audiofile(audio_path)
    return audio_path

def convert_audio_to_text(audio_path):
    import speech_recognition as sr
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_path) as source:
        recognizer.adjust_for_ambient_noise(source)
        audio = recognizer.record(source)
        try:
            return recognizer.recognize_google(audio)
        except sr.UnknownValueError:
            return "Could not understand the audio."
        except sr.RequestError:
            return "Error with the Google API."

@api_view(['POST'])
def predict_stress_from_text(request):
    data = request.data.get('text', None)
    if not data:
        return JsonResponse({"error": "No text provided"}, status=400)

    # Tokenize and preprocess the input text
    text_sequence = text_tokenizer.texts_to_sequences([data])
    padded_sequence = pad_sequences(text_sequence, maxlen=MAX_LEN)

    # Predict stress
    prediction = text_model.predict(padded_sequence)
    stress = int(prediction > 0.5)  # 1 if stress, 0 if no stress

    return JsonResponse({'stress': stress})

@api_view(['POST'])
def save_feedback(request):
    # Extract feedback entry from request data
    feedback_entry = request.data

    # Check for missing keys and provide defaults or handle errors
    text = feedback_entry.get('text', None)
    prediction = feedback_entry.get('prediction', None)  # Get prediction from request
    feedback = feedback_entry.get('feedback', None)

    # Validate required fields
    if text is None or prediction is None or feedback is None:
        return JsonResponse({"error": "Missing required fields: 'text', 'prediction', or 'feedback'"}, status=400)

    # Invert the prediction if feedback is "dislike"
    correct_label = prediction
    if feedback == 'dislike':
        correct_label = 1 - prediction  # Invert prediction (1 becomes 0, 0 becomes 1)

    # Load the original dataset
    data = pd.read_csv(TEXT_DATASET)
    # Append the new feedback entry to the dataset
    new_entry = pd.DataFrame({'text': [text], 'label': [correct_label]})
    updated_data = pd.concat([data, new_entry], ignore_index=True)

    # Save the updated dataset back to the file
    updated_data.to_csv(TEXT_DATASET, index=False)

    # Check if we have enough new records to retrain the model
    if len(updated_data) >= 5:  # Adjust this condition as needed
        print("Retraining process started...")
        retrain_model()  # Trigger retraining with the updated dataset
        print("Retraining completed")

    return JsonResponse({"status": "Feedback saved"})
