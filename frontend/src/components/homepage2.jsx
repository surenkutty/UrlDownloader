import youtube from '../images/youtubelogo.png';
import image from '../images/instalogo.png';
import supporDevices from '../images/supportdevices.svg';
import videoConvert from '../images/videoconveter.svg';
import Cardimg3 from '../images/FastDownload1.svg';
import Cardimg4 from '../images/unlimiited.svg';
import background from '../images/frontbg.png';
import spotifylogo from '../images/spotifylogo.jpg'
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../assets/css/secondpage.css';
import '../assets/css/tutorial.css';

import Footer from './Footer';
import SecondPage1 from './secondPage1';
import SecondPage2 from './Secondpage2';

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
    <div className='front'>
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
      
      {/* part2 */}
      <SecondPage1 />
       
      {/* how to use page */}
      <SecondPage2 />
      </div>
    
<div className='why'>
  <h1 className='why-head'>Why To Choose</h1>
  {/* <h2 className='why-h2'>Url Downloader</h2> */}
</div>
<section className='s4-section'>
<div class="card-container">
        <div class="card">
            <h1 className='card-head'>Support All Devices</h1>
            <img className='cardimg1' src={supporDevices} alt="" />
            <p className='card-para'>YouTubeSave is a website-based and online platform that you can easily download from any operating system, including Windows, Linux, iPhone, and Android, without any restrictions.</p>
        </div>
        <div class="card">
            <h1 className='card-head'>Online Video Converter</h1>
            <img className='cardimg2' src={videoConvert} alt="" />
            <p className='card-para'>Convert downloaded videos from Youtube to different file formats or audio-only formats (e.g., MP3, Mp4)</p>
        </div>
        <div class="card">
            <h1 className='card-head'>Fast Downloading</h1>
            <img className='cardimg3' src={Cardimg3} alt="" />
            <p className='card-para'>Using YoutubeSave downloader, quickly download your desired videos from YouTube with just a few simple clicks without wasting any time or paying extra fees.</p>
        </div>
        <div class="card">
            <h1 className='card-head'>Unlimited Download</h1>
            <img className='cardimg3' src={Cardimg4} alt="" />
            <p className='card-para'>Through this free tool, you can download the videos you want at any time and without limiting the number of downloads. Transfer speed is up to 1GB/s.</p>
        </div>
    </div>
</section>
<Footer />



</div>


   
    

    
    
  );
};

export default HomePage;