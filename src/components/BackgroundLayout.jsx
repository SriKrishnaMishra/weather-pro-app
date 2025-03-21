import React from 'react';

// Import images with explicit paths
import FogImage from '../assets/images/Fog.jpg';
import SnowImage from '../assets/images/Snow.jpg';

// Fallback image in case of import failure
const DefaultImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';

const BackgroundLayout = ({ weatherType, children }) => {
  const getBackgroundImage = () => {
    try {
      switch(weatherType) {
        case 'Fog':
          return FogImage || DefaultImage;
        case 'Snow':
          return SnowImage || DefaultImage;
        default:
          return DefaultImage;
      }
    } catch (error) {
      console.error('Error selecting background image:', error);
      return DefaultImage;
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
