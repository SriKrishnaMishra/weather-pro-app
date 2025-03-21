import React from 'react';
import FogImage from '../assets/images/Fog.jpg';
import SnowImage from '../assets/images/Snow.jpg';

const BackgroundLayout = ({ weatherType, children }) => {
  const getBackgroundImage = () => {
    try {
      switch(weatherType) {
        case 'Fog':
          return FogImage;
        case 'Snow':
          return SnowImage;
        default:
          return FogImage;
      }
    } catch (error) {
      console.error('Error loading background image:', error);
      return '';
    }
  };

  const containerStyle = {
    backgroundImage: `url(${getBackgroundImage()})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
    width: '100%',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
    backgroundColor: '#f0f2f5' // Fallback background color
  };

  const contentStyle = {
    position: 'relative',
    zIndex: 1,
    minHeight: '100vh',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default BackgroundLayout;
