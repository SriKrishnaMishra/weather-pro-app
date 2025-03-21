import React from 'react';
// Import images directly
const FogImage = require('../assets/images/Fog.jpg').default;
const SnowImage = require('../assets/images/Snow.jpg').default;

const BackgroundLayout = ({ weatherType, children }) => {
  const getBackgroundImage = () => {
    const images = {
      Fog: FogImage,
      Snow: SnowImage
    };
    return images[weatherType] || images.Fog;
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
    backgroundColor: '#f0f2f5' // Fallback color
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
