from django.shortcuts import render

# Create your views here.
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from pytube import YouTube, exceptions
from instaloader import Instaloader, Post
import os
from django.conf import settings
from django.views.generic import TemplateView
from .serializers import InstagramSerializer,YouTubeSerializer
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
# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import subprocess
import json
from pathlib import Path

class SpotifySongView(APIView):
    def post(self, request):
        spotify_url = request.data.get('url')
        
        if not spotify_url:
            return Response({"error": "Spotify URL is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            command = [
                'spotify_dl',
                '-l', spotify_url,
                '-j'  # JSON output for song details
            ]

            result = subprocess.run(command, capture_output=True, text=True)
            
            if result.returncode != 0:
                return Response({"error": result.stderr.strip()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            song_details = json.loads(result.stdout)
            return Response(song_details, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



class SpotifyDownloadView(APIView):
     def post(self, request):
        spotify_url = request.data.get('url')
        
        if not spotify_url:
            return Response({"error": "Spotify URL is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Get the path to the user's Downloads folder
            downloads_folder = str(Path.home() / "Downloads")
            if not os.path.exists(downloads_folder):
                return Response({"error": "Downloads directory does not exist"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Use a temporary file name
            temp_filename = "downloaded_song.mp3"
            download_path = os.path.join(downloads_folder, temp_filename)

            # Run spotify_dl to download the song directly to the Downloads folder
            command = [
                'spotify_dl',
                '-l', spotify_url,
                '-o', download_path
            ]

            result = subprocess.run(command, capture_output=True, text=True)

            if result.returncode != 0:
                return Response({"error": result.stderr.strip()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Verify that the file was created
            if not os.path.exists(download_path):
                return Response({"error": "Failed to save the file."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Return a response to let the client know the file is ready
            return Response({"message": "File downloaded successfully", "file_path": download_path}, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

