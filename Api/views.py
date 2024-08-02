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
# downloader/views.py




from .models import SpotifyDownloadRequest
from .serializers import SpotifyDownloadRequestSerializer
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os
SPOTIFY_CLIENT_ID="a80f518c96f64f46ba7521e595e1e314"
SPOTIFY_CLIENT_SECRET="6dec2a821f8b417c83b5ff69d498c487"

class SubmitURLView(APIView):
    def post(self, request):
        url = request.data.get('url')
        if not url:
            return Response({'error': 'URL is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Save the URL submission (optional)
        download_request = SpotifyDownloadRequest.objects.create(url=url)
        
        # Process the URL to get song/playlist details using Spotipy
        sp = spotipy.Spotify(auth_manager=SpotifyClientCredentials(
            client_id=SPOTIFY_CLIENT_ID,
            client_secret=SPOTIFY_CLIENT_SECRET
            # client_id=os.getenv('SPOTIFY_CLIENT_ID'),
            # client_secret=os.getenv('SPOTIFY_CLIENT_SECRET')
        ))

        if 'track' in url:
            track = sp.track(url)
            details = {
                'name': track['name'],
                'artists': ', '.join([artist['name'] for artist in track['artists']]),
                'album': track['album']['name'],
                'duration': track['duration_ms'],
                'url': track['external_urls']['spotify'],
            }
        elif 'playlist' in url:
            playlist = sp.playlist(url)
            details = {
                'name': playlist['name'],
                'owner': playlist['owner']['display_name'],
                'tracks': len(playlist['tracks']['items']),
                'url': playlist['external_urls']['spotify'],
            }
        else:
            return Response({'error': 'Invalid Spotify URL'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response(details, status=status.HTTP_200_OK)

class DownloadSongView(APIView):
    def post(self, request):
        url = request.data.get('url')
        if not url:
            return Response({'error': 'URL is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Implement the actual download logic here (left as an exercise)
        # For now, just update the status
        download_request = SpotifyDownloadRequest.objects.filter(url=url).first()
        if download_request:
            download_request.status = 'completed'
            download_request.save()

        return Response({'status': 'Download started'}, status=status.HTTP_200_OK)