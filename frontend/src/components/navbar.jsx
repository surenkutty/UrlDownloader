import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/navbar.css';
import logo from '../images/spyderlogo.svg';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light ">
      <div className="container-fluid">
        
        <div className="d-flex align-items-center">
        <img className="logo ms-2" src={logo} alt="logo" />
        <div className='brand'>
        <Link to="/" className="navbar-brand">CuteThamizha</Link>
        </div>
          
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/downloader" className="nav-link">Instagram</Link>
            </li>
            <li className="nav-item">
              <Link to="/youtube" className="nav-link">YouTube</Link>
            </li>
            <li className="nav-item">
              <Link to="/spotify" className="nav-link">Spotify</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
