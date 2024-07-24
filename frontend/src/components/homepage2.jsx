import youtube from '../images/youtubelogo.png';
import image from '../images/instalogo.png';
import supporDevices from '../images/supportdevices.svg';
import videoConvert from '../images/videoconveter.svg';
import Cardimg3 from '../images/FastDownload1.svg';
import Cardimg4 from '../images/unlimiited.svg';
import background from '../images/removeback.png';
import spotifylogo from '../images/spotifylogo.jpg'
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../assets/css/secondpage.css';
import '../assets/css/tutorial.css';
import MobileUse from '../images/mobileuse.png';

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
      {/* secondpage */}
      <div className='secondpage'>
        <h3 className='s2-head'>
          Free<span className='s2span'>Social Media</span> 

        </h3>
        <h4 className='s2-body'>Video Downloader</h4>
        <p className='s2para'>With This Platfrom,You Can Easily Download Any Video <br />
          <span>
          From multisocial media for free
          </span> </p>
        <button className='contact-button'>Contact</button>
        <button className='Learn-more'>LearnMore </button>
      </div> 
      {/* how to use page */}
      <div className='htu-container'>
        <h1>How To Use</h1>
      </div>
    <section>
      <div className="s3-section">
    
    <div className="s3-picture">
      <img className='mobileuse'src={MobileUse} alt="hello this img" />
    </div>
    
      
    <div className="s3-text">
    
    
      <div className="s3-container">
        <div className="round-s3">01</div>
        <div className="s3-container-content">
          <h4 className="s3-title">Find Video</h4>
          <p className="s3-para">Find the video you want from among the videos on YouTube and copy its link.</p>
        </div>
      </div>
      <div className="s3-container">
        <div className="round-s3">02</div>
        <div className="s3-container-content">
          <h4 className="s3-title">Paste Video</h4>
          <p className="s3-para">Paste the copied link in the desired box and then wait for the system to display the desired video download links in different formats and sizes.</p>
        </div>
      </div>
      <div className="s3-container">
        <div className="round-s3">03</div>
        <div className="s3-container-content">
          <h4 className="s3-title">Download Video</h4>
          <p className="s3-para">In the last step, click on download from the displayed list and save the video on your device.</p>
        </div>
      </div>
    </div>
  </div>
</section>
<div className='why'>
  <h1 className='why-head'>Why To Choose</h1>
  {/* <h2 className='why-h2'>Url Downloader</h2> */}
</div>
<section className='s4-section'>
<div class="card-container">
        <div class="card">
            <h1>Support All Devices</h1>
            <img className='cardimg1' src={supporDevices} alt="" />
            <p>YouTubeSave is a website-based and online platform that you can easily download from any operating system, including Windows, Linux, iPhone, and Android, without any restrictions.</p>
        </div>
        <div class="card">
            <h1>Online Video Converter</h1>
            <img className='cardimg2' src={videoConvert} alt="" />
            <p>Convert downloaded videos from Youtube to different file formats or audio-only formats (e.g., MP3, Mp4)</p>
        </div>
        <div class="card">
            <h1>Fast Downloading</h1>
            <img className='cardimg3' src={Cardimg3} alt="" />
            <p>Using YoutubeSave downloader, quickly download your desired videos from YouTube with just a few simple clicks without wasting any time or paying extra fees.</p>
        </div>
        <div class="card">
            <h1>Unlimited Download</h1>
            <img className='cardimg3' src={Cardimg4} alt="" />
            <p>Through this free tool, you can download the videos you want at any time and without limiting the number of downloads. Transfer speed is up to 1GB/s.</p>
        </div>
    </div>
</section>



</div>

   
    

    
    
  );
};

export default HomePage;