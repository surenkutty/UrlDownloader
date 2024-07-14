import youtube from '../images/youtubelogo.png';
import image from '../images/instalogo.png';
import background from '../images/aibackground.jpeg';
import spotifylogo from '../images/spotifylogo.jpg'
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [url, setUrl] = useState('');
  const [videoInfo, setVideoInfo] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [itag, setItag] = useState('');

  const determineService = (url) => {
    if (url.includes('instagram.com')) {
      return 'instagram';
    } else if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    } else if (url.includes('spotify.com')) {
      return 'spotify';
    }
    return null;
  };

  const fetchVideoInfo = async (url) => {
    const service = determineService(url);
    if (!service) {
      setError('Unsupported URL');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      let response;
      if (service === 'instagram') {
        response = await axios.post('http://localhost:8000/api/get-video-url/', { url });
        if (response.status === 200) {
          setVideoInfo(response.data);
          setItag(''); // No itag needed for Instagram
        }
      } else if (service === 'youtube') {
        response = await axios.get('http://localhost:8000/get_youtube/', { params: { url } });
        if (response.status === 200) {
          setVideoInfo(response.data);
          const bestStream = response.data.streams.find(stream => stream.type === 'video') ||
                             response.data.streams.find(stream => stream.type === 'audio');
          setItag(bestStream.itag);
        }
      } else if (service === 'spotify') {
        response = await axios.post('http://localhost:8000/spotify/', { url });
        if (response.status === 200) {
          setVideoInfo(response.data);
          setItag(''); // No itag needed for Spotify
        }
      } else {
        setError('Unsupported service');
        setLoading(false);
        return;
      }

      setError('');
    } catch (error) {
      setError('Error fetching video information');
      console.error('Error fetching video information:', error);
    } finally {
      setLoading(false);
    }
  };

  const downloadVideo = async () => {
    try {
      setLoading(true);
      let response;
      if (determineService(url) === 'instagram') {
        response = await axios.get(videoInfo.video_url, { responseType: 'blob' });
      } else if (determineService(url) === 'youtube') {
        response = await axios.post(
          'http://localhost:8000/download_video/',
          { url, itag },
          { responseType: 'blob' }
        );
      } else {
        setError('Download not supported for this service');
        setLoading(false);
        return;
      }

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download',`${videoInfo.title}.mp4`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setError('');
    } catch (error) {
      setError('Error downloading video');
      console.error('Error downloading video:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchVideoInfo(url);
  };

  return (
    <div className="home-page">
      <h1>Url <span> Downloader</span></h1>
      <h2>Search To Enjoy Your Journey!!</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="url"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter Instagram, YouTube, or Spotify URL"
          required
          className="url-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {loading && <div className="loading-spinner"></div>}
      {error && <p className="error-message">{error}</p>}
      {videoInfo && !loading && (
        <div className="video-info">
          {determineService(url) === 'youtube' && (
            <div>
              <h2>{videoInfo.title}</h2>
              <img src={videoInfo.thumbnail_url} alt="Thumbnail" className="thumbnail" />
              <select onChange={(e) => setItag(e.target.value)} className="resolution-select">
                <option value="">Select Resolution</option>
                {videoInfo.streams.map(stream => (
                  <option key={stream.itag} value={stream.itag}>
                    {stream.type === 'video' ? stream.resolution : stream.abr} - {stream.mime_type}
                  </option>
                ))}
              </select>
            </div>
          )}
          {determineService(url) === 'instagram' && (
            <video width="320" height="240" controls>
              <source src={videoInfo.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
          <button onClick={downloadVideo} className="download-button">Download</button>
        </div>
      )}
      <div className="service-links">
        <Link to="/downloader">
          <img src={image} alt="Instagram" className="instaimg" />
        </Link>
        <Link to="/youtube">
          <img src={youtube} alt="YouTube" className="youtubeimg" />
        </Link>
        <Link to="/spotify">
          <img src={spotifylogo} alt="Spotify" className="spotifyimg" />
        </Link>
      </div>
    </div>
    
  );
};

export default HomePage;
