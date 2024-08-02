from django.db import models

# Create your models here.
class SpotifyDownloadRequest(models.Model):
    url = models.URLField()
    status = models.CharField(max_length=100, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)