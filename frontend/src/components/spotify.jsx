import React, { useState } from 'react';
import axios from 'axios';

function SpotifyPage() {
  const [spotifyUrl, setSpotifyUrl] = useState('');
  const [songDetails, setSongDetails] = useState(null);
  const [message, setMessage] = useState('');
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleSearch = async () => {
    if (!spotifyUrl) {
      setMessage('Please enter a Spotify URL.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/spotify-search/', { url: spotifyUrl });
      setSongDetails(response.data);
      setMessage('');
    } catch (error) {
      setMessage('An error occurred while fetching the song details.');
      console.error(error);
    }
  };

  const handleDownload = async () => {
    if (!spotifyUrl) {
      setMessage('Please enter a Spotify URL.');
      return;
    }

    setIsDownloading(true);
    setDownloadProgress(0);

    try {
      const response = await axios.post('http://localhost:8000/spotify-download/', { url: spotifyUrl }, {
        onDownloadProgress: progressEvent => {
          const total = progressEvent.total;
          const current = progressEvent.loaded;
          const percentCompleted = Math.floor((current / total) * 100);
          setDownloadProgress(percentCompleted);
        }
      });
      setMessage(response.data.message);
      setDownloadLinks(response.data.files);
    } catch (error) {
      setMessage('An error occurred during the download process.');
      console.error(error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Spotify Song Downloader</h1>
      <input
        type="text"
        placeholder="Enter Spotify URL"
        value={spotifyUrl}
        onChange={(e) => setSpotifyUrl(e.target.value)}
        style={{ width: '100%', maxWidth: '500px', padding: '10px', margin: '10px auto', display: 'block' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Search Song Details
      </button>
      {message && <p>{message}</p>}
      {songDetails && (
        <div style={{ marginTop: '20px' }}>
          <h2>Song Details:</h2>
          <p><strong>Title:</strong> {songDetails.title}</p>
          <p><strong>Artist:</strong> {songDetails.artist}</p>
          <p><strong>Album:</strong> {songDetails.album}</p>
          <p><strong>Duration:</strong> {songDetails.duration} seconds</p>
          <button onClick={handleDownload} style={{ padding: '10px 20px', cursor: 'pointer', marginTop: '10px' }}>
            Download
          </button>
        </div>
      )}
      {isDownloading && (
        <div style={{ marginTop: '20px' }}>
          <p>Downloading... Please wait.</p>
          <div style={{ border: '1px solid #ccc', width: '100%', maxWidth: '500px', margin: '0 auto', borderRadius: '5px' }}>
            <div style={{
              height: '24px',
              width: `${downloadProgress}%`,
              backgroundColor: '#4caf50',
              borderRadius: '5px',
              textAlign: 'center',
              color: 'white'
            }}>
              {downloadProgress}%
            </div>
          </div>
        </div>
      )}
      {downloadLinks.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Downloaded Files:</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {downloadLinks.map((link, index) => (
              <li key={index}>
                <a href={link} download>{link}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SpotifyPage;
