import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/spotify.css';

function SpotifyPage() {
  const [url, setUrl] = useState('');
  const [details, setDetails] = useState(null);

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://127.0.0.1:8000/submit-url/', { url });
          setDetails(response.data);
      } catch (error) {
        alert("hello error");
          console.error('Error submitting URL', error);
      }
  };

  const handleDownload = async () => {
      try {'/download-song/', { url };
          alert('Download started');
      } catch (error) {
          console.error('Error starting download', error);
      }
  };

  return (
      <div>
          <h1>Spotify URL Downloader</h1>
          <form onSubmit={handleSubmit}>
              <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter Spotify URL"
                  required
              />
              <button type="submit">Submit</button>
          </form>
          {details && (
              <div>
                  <h2>Details</h2>
                  <pre>{JSON.stringify(details, null, 2)}</pre>
                  <button onClick={handleDownload}>Download</button>
              </div>
          )}
      </div>
  );
};

export default SpotifyPage;
