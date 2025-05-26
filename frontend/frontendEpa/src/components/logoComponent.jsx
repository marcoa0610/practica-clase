import React from 'react';
import epaLogo from '../assets/logoEpa.jpg';

const Logo = () => {
  return (
    <div className="logo-wrapper">
      <img 
        src={epaLogo} 
        alt="IEPA Logo" 
        className="logo-image"
      />
    </div>
  );
};

export default Logo;