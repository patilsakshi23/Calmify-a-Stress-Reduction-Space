from django.contrib import admin
from django.urls import path
from api.views import upload_video, home

urlpatterns = [
    path('', home, name='home'),
    path('upload/', upload_video, name='upload_video'),
    path('admin/', admin.site.urls),
]
