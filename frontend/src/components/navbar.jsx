// src/components/Navbar.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    
      <nav className="navbar">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/downloader">Instagram</Link></li>
          <li><Link to="/youtube">Youtube </Link></li>
         <li><Link to="/spotify">Spotify</Link></li>
      </ul>

</nav>

    
    
    
  );
};

export default Navbar;
