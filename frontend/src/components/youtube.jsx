import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/youtube.css';


function YoutubeDownloader() {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [selectedItag, setSelectedItag] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState(false);

  const fetchVideoInfo = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:8000/get_youtube/', { params: { url } });
      setVideoInfo(response.data);
    } catch (error) {
      if (error.response) {
        console.error('Server responded with error:', error.response.data);
      } else if (error.request) {
        console.error('Request made but no response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
      setError('Error fetching video information');
    } finally {
      setLoading(false);
    }
  };

  const downloadVideo = async () => {
    if (!selectedItag) {
      alert('Please select a resolution or audio stream.');
      return;
    }

    setDownloading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/download_video/', { url, itag: selectedItag }, { responseType: 'blob' });
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${videoInfo.title}.mp4`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading video:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="youtube-page">
      <h1>YouTube Video Downloader</h1>
      <div className="form-container animated">
        <input
          type="text"
          value={url}
          onChange={e => setUrl(e.target.value)}
          placeholder="Enter YouTube URL"
          className="url-input"
        />
        <button onClick={fetchVideoInfo} className="search-button">
          {loading ? 'Loading...' : 'Fetch Video Info'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {videoInfo && (
        <div className="video-info animated">
          <h2>{videoInfo.title}</h2>
          <img src={videoInfo.thumbnail_url} className='youtube-thumbnail' alt="thumbnail" />
          <div className="streams-container">
            <h3>Video Streams</h3>
            <div className="stream-list">
              {videoInfo.streams
                .filter(stream => stream.type === 'video')
                .map(stream => (
                  <button
                    key={stream.itag}
                    onClick={() => setSelectedItag(stream.itag)}
                    className={`stream-button ${selectedItag === stream.itag ? 'selected' : ''}`}
                  >
                    {stream.resolution} - {stream.type}
                  </button>
                ))}
            </div>
            <h3>Audio Streams</h3>
            <div className="stream-list">
              {videoInfo.streams
                .filter(stream => stream.type === 'audio')
                .map(stream => (
                  <button
                    key={stream.itag}
                    onClick={() => setSelectedItag(stream.itag)}
                    className={`stream-button ${selectedItag === stream.itag ? 'selected' : ''}`}
                  >
                    {stream.abr} - {stream.type}
                  </button>
                ))}
            </div>
          </div>
          <button onClick={downloadVideo} className="download-button">
            {downloading ? 'Downloading...' : 'Download'}
          </button>
        </div>
      )}
    </div>
  );
}

export default YoutubeDownloader;
