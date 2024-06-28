from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from pytube import YouTube, exceptions
from instaloader import Instaloader, Post
import os
from django.conf import settings
from django.views.generic import TemplateView
from .serializers import InstagramSerializer,YouTubeSerializer,SpotifySerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .instagram import instagram_video_url

class IndexView(TemplateView):
    template_name = 'index.html'

#instagram

loader = Instaloader()

class InstagramAPIView(APIView):
    def post(self, request, *args, **kwargs):
        serializer =InstagramSerializer(data=request.data)
        if serializer.is_valid():
            url = serializer.validated_data['url']
            
            video_url = instagram_video_url(url)
            return Response({'video_url': video_url}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#youtube views


from pytube import YouTube


class YoutubeVideoInfoView(APIView):
    def get(self, request):
        serializer = YouTubeSerializer(data=request.GET)
        if serializer.is_valid():
            url = serializer.validated_data['url']
            yt = YouTube(url)
            video_info = {
                'title': yt.title,
                'thumbnail_url': yt.thumbnail_url,
                'streams': [
                    {
                        'itag': stream.itag,
                        'mime_type': stream.mime_type,
                        'resolution': stream.resolution,
                        'type': 'video' if stream.is_progressive else 'audio'
                    } for stream in yt.streams.filter(progressive=True)
                ] + [
                    {
                        'itag': stream.itag,
                        'mime_type': stream.mime_type,
                        'abr': stream.abr,
                        'type': 'audio'
                    } for stream in yt.streams.filter(only_audio=True)
                ]
            }
            return Response(video_info, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class YoutubeDownloadVideoView(APIView):
    def post(self, request):
        serializer = YouTubeSerializer(data=request.data)
        if serializer.is_valid():
            url = serializer.validated_data['url']
            itag = request.data.get('itag')
            yt = YouTube(url)
            stream = yt.streams.get_by_itag(itag)
            file_path = stream.download()
            with open(file_path, 'rb') as f:
                response = HttpResponse(f.read(), content_type="video/mp4")
                response['Content-Disposition'] = f'attachment; filename="{os.path.basename(file_path)}"'
            os.remove(file_path)
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#spotify views
# downloader/views.py




import tempfile
import os
import subprocess
import shutil

class SpotifyApiView(APIView):
    def post(self, request):
        serializer = SpotifySerializer(data=request.data)
        if serializer.is_valid():
            url = serializer.validated_data['url']
            
            try:
                download_result = download_spotify_content(url)
                return Response(download_result, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def download_spotify_content(url):
    with tempfile.TemporaryDirectory() as temp_dir:
        command = [
            'spotify_dl', '--url', url, '--output', temp_dir
        ]
        
        result = subprocess.run(command, capture_output=True, text=True)
        
        if result.returncode != 0:
            raise Exception(f"Download failed: {result.stderr}")

        files = os.listdir(temp_dir)
        
        # Optionally move or process files further
        return {"message": "Download completed", "files": files}