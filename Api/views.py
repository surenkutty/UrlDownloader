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
import subprocess
import os




class SpotifyApiView(APIView):
     def post(self, request):
        serializer = SpotifySerializer(data=request.data)
        if serializer.is_valid():
            url = serializer.validated_data['url']
            # Use spotify-dl to download the song or playlist
            try:
                download_directory = './downloads'
                if not os.path.exists(download_directory):
                    os.makedirs(download_directory)

                # Running spotify_dl command
                result = subprocess.run(
                    ['spotify_dl', '-l', url, '-o', download_directory],
                    capture_output=True, text=True
                )

                if result.returncode == 0:
                    return Response({"message": "Download started", "details": result.stdout}, status=status.HTTP_200_OK)
                else:
                    return Response({"error": result.stderr}, status=status.HTTP_400_BAD_REQUEST)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
