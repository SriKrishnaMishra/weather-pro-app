import React from 'react';

const BackgroundLayout = ({ weatherType, children }) => {
  const getBackgroundImage = () => {
    try {
      switch(weatherType) {
        case 'Fog':
          return require('../assets/images/Fog.jpg').default;
        case 'Snow':
          return require('../assets/images/Snow.jpg').default;
        default:
          return require('../assets/images/Fog.jpg').default; // Default background
      }
    } catch (error) {
      console.error('Error loading background image:', error);
      // Fallback to a default image or placeholder
      return 'path/to/default/image.jpg';
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
