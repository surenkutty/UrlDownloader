// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar';
import HomePage from './components/homepage';
import DownloaderPage from './components/downloaderPage';
import YoutubeDownloader from './components/youtube';
import Spotifypage from './components/spotify';

const App = () => {
  return (
    
    <Router>
      <div>
        
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/downloader" element={<DownloaderPage />} />
          <Route path="/youtube" element={<YoutubeDownloader/>}/>
          <Route path="/spotify" element={<Spotifypage/>}/>
        </Routes>
        
      </div>
    </Router>
    
  );
};

export default App;
