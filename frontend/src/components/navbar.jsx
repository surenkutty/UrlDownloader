// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Spyder</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/downloader">Instagram</Link></li>
        <li><Link to="/youtube">YouTube</Link></li>
        <li><Link to="/spotify">Spotify</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
