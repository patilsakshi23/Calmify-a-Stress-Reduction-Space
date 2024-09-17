from django.http import JsonResponse
from rest_framework.decorators import api_view
from moviepy.editor import VideoFileClip
import speech_recognition as sr
import os

from django.http import HttpResponse

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
    video = VideoFileClip(video_path)
    audio_path = video_path.replace('.mp4', '.wav')
    video.audio.write_audiofile(audio_path)
    return audio_path

def convert_audio_to_text(audio_path):
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
        