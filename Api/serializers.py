from rest_framework import serializers

class InstagramSerializer(serializers.Serializer):
    url = serializers.URLField()

class YouTubeSerializer(serializers.Serializer):
    url = serializers.URLField()
class SpotifySerializer(serializers.Serializer):
    url=serializers.URLField()