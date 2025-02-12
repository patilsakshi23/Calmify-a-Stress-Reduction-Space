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
import speech_recognition as sr
from PIL import Image
import cv2
import base64
from io import BytesIO

# Paths to files
MODEL_PATH = 'text_model/Text_Prediction_Model.keras'
TOKENIZER_PATH = 'text_model/tokenizer_stress.pkl'
TEXT_DATASET = 'text_model/text_dataset.csv'
EMOTION_MODEL_PATH = 'video_model/emotion.h5'  # Path to your emotion detection model
MAX_LEN = 100  # Max length used during training

# Load the trained text model and tokenizer
with open(TOKENIZER_PATH, 'rb') as file:
    text_tokenizer = pickle.load(file)
text_model = load_model(MODEL_PATH)

# Load the emotion detection model
emotion_model = load_model(EMOTION_MODEL_PATH)

def home(request):
    return HttpResponse("Welcome to the Stress Detection API!")

def extract_audio(video_path):
    from moviepy.editor import VideoFileClip
    video = VideoFileClip(video_path)
    audio_path = video_path.replace('.mp4', '.wav')
    video.audio.write_audiofile(audio_path)
    return audio_path

# def convert_audio_to_text(audio_path):
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


def extract_frames(video_path, frame_interval=30):
    video = cv2.VideoCapture(video_path)
    frames = []
    frame_count = 0
    while True:
        ret, frame = video.read()
        if not ret:
            break
        if frame_count % frame_interval == 0:
            frames.append(frame)
        frame_count += 1
    video.release()
    return frames

def get_emotion_from_predictions(predictions):
    emotion_labels = ['Anger', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']
    max_index = np.argmax(predictions)
    return emotion_labels[max_index]


def process_video(video_path):
    frames = extract_frames(video_path, frame_interval=30)
    frames_info = []

    for frame in frames:
        # Convert frame (numpy array) to base64
        img = Image.fromarray(frame)
        buffered = BytesIO()
        img.save(buffered, format="JPEG")
        frame_base64 = base64.b64encode(buffered.getvalue()).decode("utf-8")

        # Predict emotion
        img = img.resize((224, 224))
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        predictions = emotion_model.predict(img_array)
        detected_emotion = get_emotion_from_predictions(predictions)

        # Append frame information with emotion
        frames_info.append({"emotion": detected_emotion, "frame": frame_base64})

    return frames_info



@api_view(['POST'])
def upload_video(request):
    file = request.FILES.get('file')
    if not file:
        return JsonResponse({"error": "No file provided"}, status=400)

    video_path = os.path.join('uploads', file.name)
    with open(video_path, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)

    frames_info = process_video(video_path)
    os.remove(video_path)  # Clean up uploaded video

    # Print out frames_info to debug
    print("Frames info:", frames_info) 

    return JsonResponse({"frames": frames_info})
