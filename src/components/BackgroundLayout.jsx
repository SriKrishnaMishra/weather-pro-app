import React from 'react';

// Robust image import function with multiple fallback strategies
const importImage = (imageName) => {
  try {
    // Multiple import strategies
    const importPaths = [
      () => require(`../assets/images/${imageName}`),
      () => require(`../../src/assets/images/${imageName}`),
      () => `/images/${imageName}`,
      () => `${process.env.PUBLIC_URL}/images/${imageName}`
    ];

    for (const getPath of importPaths) {
      try {
        const importedImage = getPath();
        return importedImage.default || importedImage;
      } catch (pathError) {
        console.warn(`Failed to import image from path: ${getPath()}`, pathError);
      }
    }

    console.error(`Could not import image: ${imageName}`);
    return '';
  } catch (error) {
    console.error(`Unexpected image import error for ${imageName}:`, error);
    return '';
  }
};

const FogImage = importImage('Fog.jpg');
const SnowImage = importImage('Snow.jpg');

const BackgroundLayout = ({ weatherType, children }) => {
  const getBackgroundImage = () => {
    const images = {
      Fog: FogImage,
      Snow: SnowImage
    };
    return images[weatherType] || images.Fog || '';
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
    padding: '20px'
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
