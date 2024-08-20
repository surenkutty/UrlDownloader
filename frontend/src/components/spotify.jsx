// src/SpotifyDownloader.jsx
import React, { useState } from 'react';
import axios from 'axios';

function SpotifyPage() {
    const [url, setUrl] = useState('');
    const [songDetails, setSongDetails] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [downloading, setDownloading] = useState(false);

    // Handle fetching song details from the backend
    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        setSongDetails(null);

        try {
            const response = await axios.post('http://localhost:8000/spotify-url/', { url, action: 'fetch' });
            setSongDetails(response.data);
        } catch (err) {
            setError('Failed to fetch song details. Please check the URL and try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle downloading the song from the backend
    const handleDownload = async () => {
        setDownloading(true);
        setError(null);

        try {
            const response = await axios.post('http://localhost:8000/spotify-url/', { url, action: 'download' });
            const downloadLinks = response.data.files;

            // Trigger the download of each file
            downloadLinks.forEach(link => {
                // Create a hidden anchor element and trigger a click to start download
                const a = document.createElement('a');
                a.href = link;
                a.download = link.split('/').pop(); // Set file name
                a.style.display = 'none'; // Hide the anchor element
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a); // Remove the element after download
            });
        } catch (err) {
            setError('Failed to download the song. Please check the URL and try again.');
        } finally {
            setDownloading(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
            <h1>Spotify URL Song Downloader</h1>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter Spotify URL"
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
            <button onClick={handleSearch} style={{ padding: '10px 20px' }}>
                {loading ? 'Loading...' : 'Fetch Details'}
            </button>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

            {songDetails && (
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <h2>{songDetails.title}</h2>
                    <p>Artist: {songDetails.artist}</p>
                    <p>Album: {songDetails.album}</p>
                    {songDetails.cover_url && (
                        <img src={songDetails.cover_url} alt={songDetails.title} style={{ maxWidth: '100%' }} />
                    )}
                    <button
                        onClick={handleDownload}
                        style={{ marginTop: '20px', padding: '10px 20px' }}
                        disabled={downloading}
                    >
                        {downloading ? 'Downloading...' : 'Download'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default SpotifyPage;
