from rest_framework import serializers
from .models import SpotifyDownloadRequest
class InstagramSerializer(serializers.Serializer):
    url = serializers.URLField()

class YouTubeSerializer(serializers.Serializer):
    url = serializers.URLField()
# class SpotifySerializer(serializers.Serializer):
#     url=serializers.URLField()

class SpotifyDownloadRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpotifyDownloadRequest
        fields = ['id', 'url', 'status', 'created_at']