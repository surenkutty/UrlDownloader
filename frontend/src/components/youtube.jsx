import React, { useState } from 'react';
import axios from 'axios';

function YoutubeDownloader() {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [itag, setItag] = useState(null);

  const fetchVideoInfo = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/get_youtube/', { params: { url } });
      setVideoInfo(response.data);
    } catch (error) {
      console.error('Error fetching video info:', error);
    }
  };

  const downloadVideo = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/download_video/', { url, itag }, { responseType: 'blob' });
      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `${videoInfo.title}.mp4`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error downloading video:', error);
    }
  };

  return (
    <div>
      <h1>YouTube Video Downloader</h1>
      <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="Enter YouTube URL" />
      <button onClick={fetchVideoInfo}>Fetch Video Info</button>

      {videoInfo && (
        <div>
          <h2>{videoInfo.title}</h2>
          <img src={videoInfo.thumbnail_url} alt="thumbnail" />
          <select onChange={e => setItag(e.target.value)}>
            <option value="">Select Resolution</option>
            {videoInfo.streams.map(stream => (
              <option key={stream.itag} value={stream.itag}>
                {stream.type} - {stream.resolution || stream.abr}
              </option>
            ))}
          </select>
          <button onClick={downloadVideo}>Download</button>
        </div>
      )}
    </div>
  );
}

export default YoutubeDownloader;
