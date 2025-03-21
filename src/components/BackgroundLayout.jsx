import React from 'react';
import FogImage from '../assets/images/Fog.jpg';
import SnowImage from '../assets/images/Snow.jpg';

const BackgroundLayout = ({ weatherType, children }) => {
  const getBackgroundImage = () => {
    switch(weatherType) {
      case 'Fog':
        return FogImage;
      case 'Snow':
        return SnowImage;
      default:
        return FogImage; // Default background
    }
  };

  return (
    <div 
      style={{
        backgroundImage: `url(${getBackgroundImage()})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      {children}
    </div>
  );
};

export default BackgroundLayout;
