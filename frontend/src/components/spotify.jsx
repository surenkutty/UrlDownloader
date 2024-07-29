import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/spotify.css';

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
    setSongs([]);
    try {
      const response = await axios.post('http://localhost:8000/api/spotify/', { url });
      setSongs(response.data.files);
    } catch (err) {
      setError(err.response ? err.response.data : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (fileName) => {
    const link = document.createElement('a');
    link.href = `http://localhost:8000/media/${fileName}`; // Ensure this path is correct based on your server setup
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
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
      {error && (
        <div style={{ color: 'red' }}>
          {typeof error === 'string' ? error : JSON.stringify(error)}
        </div>
      )}
      {songs.length > 0 && (
        <div>
          <h2>Playlist</h2>
          <ul>
            {songs.map((song, index) => (
              <li key={index}>
                {song} <button onClick={() => handleDownload(song)}>Download</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SpotifyPage;
