import youtube from '../images/youtubelogo.png';
import image from '../images/instalogo.png';
import background from '../images/removeback.png';
import spotifylogo from '../images/spotifylogo.jpg'
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [url, setUrl] = useState('');
    const navigate = useNavigate();
  
    const NevigatPage = () => {
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            navigate('/youtube', { state: { url } });
          } else if (url.includes('instagram.com')) {
            navigate('/instagram', { state: { url } });
          } else if (url.includes('spotify.com')) {
            navigate('/spotify', { state: { url } });
          } else {
            alert('Unsupported URL');
          }
    };
  
  return (
    <div className="home-page">
      <h1 className='animated'>Url <span> Downloader</span></h1>
      <h2 className='animated'>Search To Enjoy Your Journey!!</h2>
      <div className="image-container">
        <img src={background} alt="Animated Image" className="animated-image" />
      </div>
      <div className="form-container animated">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter Instagram, YouTube, or Spotify URL"
          required
          className="url-input"
        />
        <button onClick={NevigatPage} className="search-button animated">Search</button>
      
        </div>
        
      <div className="service-links animated">
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
