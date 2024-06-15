import React, { useState } from 'react';

const Spotifypage = () => {
  const [url, setUrl] = useState('');
  const [info, setInfo] = useState(null);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    if (!url) {
      setMessage('Please enter a Spotify URL');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/spotify/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();
      if (response.ok) {
        setInfo(data);
        setMessage('');
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleDownload = () => {
    if (info) {
      setMessage('Download started');
    } else {
      setMessage('No song information available to download');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Spotify Downloader</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter Spotify URL"
        style={{ padding: '10px', width: '300px' }}
      />
      <button onClick={handleSearch} style={{ padding: '10px', marginLeft: '10px' }}>
        Search
      </button>
      {info && (
        <div style={{ marginTop: '20px' }}>
          <h3>Song/Playlist Info</h3>
          <p>{info.message}</p>
          <button onClick={handleDownload} style={{ padding: '10px', marginTop: '10px' }}>
            Download
          </button>
        </div>
      )}
      <div style={{ marginTop: '20px', color: 'red' }}>{message}</div>
    </div>
  );
};

export default Spotifypage;
