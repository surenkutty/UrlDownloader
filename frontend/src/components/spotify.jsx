import React, { useState } from 'react';
import axios from 'axios';

const SpotifyPage = () => {
    const [url, setUrl] = useState('');
    const [songDetails, setSongDetails] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchSongDetails = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/spotify-search/', { url });
            console.log(response.data);  // Log the response to verify structure
            setSongDetails(response.data);
            setError('');
            
        } catch (err) {
            setError('Failed to fetch song details.');
            setSongDetails(null);
        } finally {
            setIsLoading(false);
        }
    };

    const downloadSong = async () => {
        try {
            const response = await axios.post('http://localhost:8000/spotify-download/', { url });
            setSuccess(response.data.message);
            setError('');
        } catch (err) {
            setError('Failed to download the song.');
            setSuccess('');
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
            <h1>Spotify Song Downloader</h1>
            <input
                type="text"
                placeholder="Enter Spotify URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '16px' }}
            />
            <button
                onClick={fetchSongDetails}
                style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#1DB954',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                }}
            >
                {isLoading ? 'Loading...' : 'Search'}
            </button>

            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            {success && <p style={{ color: 'green', marginTop: '10px' }}>{success}</p>}

            {songDetails && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Song Details</h2>
                    <p><strong>Title:</strong> {songDetails.title || 'N/A'}</p>
                    <p><strong>Artist:</strong> {songDetails.artist || 'N/A'}</p>
                    <p><strong>Album:</strong> {songDetails.album || 'N/A'}</p>
                    <p><strong>Release Date:</strong> {songDetails.release_date || 'N/A'}</p>
                    <p><strong>Duration:</strong> {songDetails.duration || 'N/A'} seconds</p>
                    <button
                        onClick={downloadSong}
                        style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: '#1DB954',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            marginTop: '10px',
                        }}
                    >
                        Download
                    </button>
                </div>
            )}
        </div>
    );
};

export default SpotifyPage;
