import youtube from '../images/youtubelogo.png';
import image from '../images/instalogo.png';
import background from '../images/removeback.png';
import spotifylogo from '../images/spotifylogo.jpg'
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../assets/css/secondpage.css';

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
      <div className='secondpage'>
        <h3 className='s2-head'>
          Free<span className='s2span'>Url Downloader</span>

        </h3>
        <h4 className='s2-body'>Video Downloader</h4>
        <p className='s2para'>With This Platfrom,You Can Easily Download Any Video <br />
          <span>
          From multisocial media for free
          </span> </p>
        <button className='contact-button'>Contact</button>
        <button className='Learn-more'>LearnMore</button>


      </div>
    </div>
    

    
    
  );
};

export default HomePage;