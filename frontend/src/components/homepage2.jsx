import youtube from '../images/youtubelogo.png';
import image from '../images/instalogo.png';
import background from '../images/removeback.png';
import spotifylogo from '../images/spotifylogo.jpg'
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../assets/css/secondpage.css';
import '../assets/css/tutorial.css';

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
      <div className="box">
      <h1 className='animated'>Url <span> Downloader</span></h1>
      <h2 className='animated'>Search To Enjoy Your Journey!!</h2>
      </div>
      
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
        <button className='Learn-more'>LearnMore </button>

      <section>
  <div className="s3-section">
    <div className="s3-picture">
      <h6>Hello this Picture</h6>
    </div>
    <div className="s3-text">
      <div className="s3-text-top">
        <h2 className="title01">How To Use</h2>
        <h3 className='body01'>Url <span className="span01">Downloader</span></h3>
      </div>
      <div className="s3-container">
        <div className="round-s3">01</div>
        <div className="s3-container-content">
          <h1 className="s3-title">Find Video</h1>
          <p className="s3-para">Find the video you want from among the videos on YouTube and copy its link.</p>
        </div>
      </div>
      <div className="s3-container">
        <div className="round-s3">02</div>
        <div className="s3-container-content">
          <h1 className="s3-title">Paste Video</h1>
          <p className="s3-para">Paste the copied link in the desired box and then wait for the system to display the desired video download links in different formats and sizes.</p>
        </div>
      </div>
      <div className="s3-container">
        <div className="round-s3">03</div>
        <div className="s3-container-content">
          <h1 className="s3-title">Download Video</h1>
          <p className="s3-para">In the last step, click on download from the displayed list and save the video on your device.</p>
        </div>
      </div>
    </div>
  </div>
</section>



      </div>
    </div>
    

    
    
  );
};

export default HomePage;