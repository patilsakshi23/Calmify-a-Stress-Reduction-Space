from django.contrib import admin
from django.urls import path
from api.views import upload_video, home
from . import speech_to_text

urlpatterns = [
    path('', home, name='home'),
    path('upload/', upload_video, name='upload_video'),
    path('admin/', admin.site.urls),
    path('api/speech-to-text/', speech_to_text.convert_speech_to_text, name='speech_to_text'),
]
