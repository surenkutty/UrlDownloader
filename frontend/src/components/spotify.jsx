import React, { useState } from 'react';
import axios from 'axios';
import ErrorBoundary from './errorboundery'; 
import '../assets/css/spotify.css';
// import spotifybackground from '../images/spotify-background.jpeg';
// Import the ErrorBoundary component

function SpotifyPage() {
  const [url, setUrl] = useState('');
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/spotify/', { url });
      setSongs(response.data.files);
    } catch (err) {
      setError(err.response ? err.response.data : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (path) => {
    const link = document.createElement('a');
    link.href = path;
    link.download = path.split('/').pop();
    link.click();
  };

  return (
    <ErrorBoundary>
      <div className="spotify-page">
        <h1>Spotify URL Downloader</h1>
        <input
          type="text"
          value={url}
          onChange={handleUrlChange}
          placeholder="Enter Spotify URL"
        />
        <button onClick={handleSearch} disabled={loading}>
          {loading ? 'Loading...' : 'Search'}
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {songs.length > 0 && (
          <div>
            <h2>Playlist</h2>
            <ul>
              {songs.map((song, index) => (
                <li key={index}>
                  {song.name} <button onClick={() => handleDownload(song.path)}>Download</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default SpotifyPage;
