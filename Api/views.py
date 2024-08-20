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


# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import os
import subprocess
import shutil

class SpotifyDownloadAPIView(APIView):
    def post(self, request):
        spotify_url = request.data.get('url')

        if not spotify_url:
            return Response({'error': 'Spotify URL is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Set the output directory where the song/playlist will be saved
            temp_dir = 'downloads/'  # Temporary download location
            os.makedirs(temp_dir, exist_ok=True)

            # Command to download the song or playlist using spotdl
            download_command = ['spotdl', '--output', temp_dir, spotify_url]

            # Execute the command safely using subprocess
            subprocess.run(download_command, check=True)

            # Move downloaded files to the media directory
            media_dir = os.path.join(settings.MEDIA_ROOT, 'songs/')
            os.makedirs(media_dir, exist_ok=True)

            downloaded_files = os.listdir(temp_dir)
            download_links = []

            for file in downloaded_files:
                if file.endswith('.mp3'):
                    # Move the file to the media directory
                    shutil.move(os.path.join(temp_dir, file), media_dir)
                    download_links.append(f'{settings.MEDIA_URL}songs/{file}')

            # Cleanup the temporary download directory
            shutil.rmtree(temp_dir)

            if not download_links:
                return Response({'error': 'No files were downloaded. Please check the Spotify URL.'},
                                status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({
                'message': 'Download completed successfully.',
                'files': download_links,
            }, status=status.HTTP_200_OK)

        except subprocess.CalledProcessError as e:
            return Response({'error': 'An error occurred during the download process.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
