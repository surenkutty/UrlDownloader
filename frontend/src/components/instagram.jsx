// src/components/DownloadForm.jsx

import React, { useState } from 'react'
import axios from 'axios'

const DownloadForm = () => {
  const [url, setUrl] = useState('')
  const [videoUrl, setVideoUrl] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/get-video-url/', { url })
      setVideoUrl(response.data.video_url)
      setError('')
    } catch (error) {
      setError('Error fetching video')
    }
  }

  const handleDownload = async () => {
    try {
      const response = await axios.get(videoUrl, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'instagram_video.mp4');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      setError('Error downloading video');
    }
  };

  return (
    <div className='insta-page'>
      <h1>Instagram Video Downloader</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Instagram Video URL"
          required
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
      {videoUrl && (
        <div>
          <video width="320" height="240" controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <button onClick={handleDownload}>Download</button>
        </div>
      )}
    </div>
  )
}

export default DownloadForm
