from django.http import JsonResponse, HttpResponse
from tensorflow import keras
from tensorflow.keras.models import load_model # type: ignore
from tensorflow.keras.preprocessing.sequence import pad_sequences # type: ignore
from rest_framework.decorators import api_view
import subprocess
import os
import pickle
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from .retrain_model import retrain_model  # Import the retraining logic
import speech_recognition as sr
from PIL import Image
import cv2
from moviepy import VideoFileClip
from io import BytesIO

# Paths to files
MODEL_PATH = 'text_model/Text_Prediction_Model.keras'
TOKENIZER_PATH = 'text_model/tokenizer_stress.pkl'
TEXT_DATASET = 'text_model/text_dataset.csv'
EMOTION_MODEL_PATH = 'video_model/facial_emotion_video_model.h5'  # Path to your emotion detection model
MAX_LEN = 100  # Max length used during training

# Load the trained text model and tokenizer
with open(TOKENIZER_PATH, 'rb') as file:
    text_tokenizer = pickle.load(file)
text_model = load_model(MODEL_PATH)

# Load the emotion detection model
emotion_model = load_model(EMOTION_MODEL_PATH)

def home(request):
    return HttpResponse("Welcome to the Stress Detection API!")



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
    fps = video.get(cv2.CAP_PROP_FPS)  # Get the frames per second
    frame_interval = int(fps * 2)
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
    print(f"Extracted {len(frames)} frames.")  # Debugging print
    return frames


def get_emotion_from_predictions(predictions):
    emotion_labels = ['Anger', 'Disgust', 'Fear', 'Happy', 'Sad', 'Surprise', 'Neutral']
    max_index = np.argmax(predictions)
    return emotion_labels[max_index]


def process_video(video_path):
    frames = extract_frames(video_path, frame_interval=30)
    emotion_counts = {}

    for frame in frames:
        # Convert frame to grayscale
        gray_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        resized_frame = cv2.resize(gray_frame, (48, 48))  # Resize to match model input
        img_array = np.array(resized_frame) / 255.0  # Normalize pixel values
        img_array = np.expand_dims(img_array, axis=-1)  # Add channel dimension
        img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension

        # Predict emotion
        predictions = emotion_model.predict(img_array)
        detected_emotion = get_emotion_from_predictions(predictions)

         # Count occurrences of each detected emotion
        if detected_emotion in emotion_counts:
            emotion_counts[detected_emotion] += 1
        else:
            emotion_counts[detected_emotion] = 1

    # Determine the most frequently detected emotion
    final_emotion = max(emotion_counts, key=emotion_counts.get) if emotion_counts else "Unknown"

    return final_emotion


# @api_view(['POST'])
# def upload_video(request):
#     file = request.FILES.get('file')
#     if not file:
#         return JsonResponse({"error": "No file provided"}, status=400)

#     video_path = os.path.join('uploads', file.name)
#     with open(video_path, 'wb+') as destination:
#         for chunk in file.chunks():
#             destination.write(chunk)

#     final_emotion = process_video(video_path)
#     os.remove(video_path)  # Clean up uploaded video

#     return JsonResponse({"Final emotion": final_emotion})





# Function to extract text from video using SpeechRecognition
def extract_text_from_video(video_path):
    try:
        # Convert video to WAV format
        audio_path = video_path.replace('.mp4', '.wav')  # Change extension
        temp_audio_path = "temp_audio.wav"  # Temporary file to avoid issues

        # Use FFmpeg to extract audio
        ffmpeg_cmd = f"ffmpeg -i \"{video_path}\" -ac 1 -ar 16000 \"{temp_audio_path}\" -y"
        process = subprocess.run(ffmpeg_cmd, shell=True, capture_output=True, text=True)

        # Check for errors in FFmpeg output
        if process.returncode != 0:
            return f"FFmpeg error: {process.stderr}"

        # Convert audio to text using SpeechRecognition
        recognizer = sr.Recognizer()
        with sr.AudioFile(temp_audio_path) as source:
            audio = recognizer.record(source)
            extracted_text = recognizer.recognize_google(audio)  # Using Google Speech API

        # Clean up temporary files
        os.remove(temp_audio_path)

        return extracted_text

    except Exception as e:
        return str(e)  # Return error message if an issue occurs

# Process video for emotion detection and speech-to-text conversion
@api_view(['POST'])
def upload_video(request):
    file = request.FILES.get('file')
    if not file:
        return JsonResponse({"error": "No file provided"}, status=400)

    # Save the uploaded video temporarily
    video_path = os.path.join('uploads', file.name)
    with open(video_path, 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)

    try:
        # 1️⃣ Extract emotions from video (Using your existing method)
        final_emotion = process_video(video_path)

        # 2️⃣ Extract text from video (speech-to-text)
        extracted_text = extract_text_from_video(video_path)

        # 3️⃣ Predict stress from extracted text (Using your existing text model)
        if extracted_text:
            text_sequence = text_tokenizer.texts_to_sequences([extracted_text])
            padded_sequence = pad_sequences(text_sequence, maxlen=MAX_LEN)
            prediction = text_model.predict(padded_sequence)
            stress = int(prediction > 0.5)  # 1 = Stress, 0 = No Stress
        else:
            stress = None  # No text detected

        # Remove uploaded video
        os.remove(video_path)

        # 4️⃣ Return both video emotion & extracted text results
        return JsonResponse({
            "Final Emotion from Video": final_emotion,
            "Extracted Text": extracted_text,
            "Stress Prediction": stress
        })

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)