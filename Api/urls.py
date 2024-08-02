from django.urls import path, re_path
from django.views.generic import TemplateView
from django.contrib.staticfiles.views import serve
from django.conf import settings
from django.conf.urls.static import static
from . import views
from .views import InstagramAPIView,YoutubeDownloadVideoView,YoutubeVideoInfoView,SubmitURLView, DownloadSongView
urlpatterns = [
    # Your Django app views
    path('api/get-video-url/', InstagramAPIView.as_view(), name='get_video_url'),
    # path('api/spotify/',SpotifyApiView.as_view(), name='spotify'),
    
    path('get_youtube/', YoutubeVideoInfoView.as_view(), name='get_video_info'),
    path('download_video/', YoutubeDownloadVideoView.as_view(), name='download_video'),
    path('submit-url/', SubmitURLView.as_view(), name='submit-url'),
    path('download-song/', DownloadSongView.as_view(), name='download-song'),

    # Serve React static files
    re_path(r'^static/(?P<path>.*)$', serve),

    # Catch all other paths to serve index.html
    re_path(r'^.*', TemplateView.as_view(template_name='index.html')),
]

# Serve static and media files during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)