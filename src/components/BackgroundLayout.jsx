import React from 'react';

const BackgroundLayout = ({ weatherType, children }) => {
  const getBackgroundImageUrl = () => {
    // Using relative paths from public folder
    const type = weatherType?.toLowerCase() || 'fog';
    return `${process.env.PUBLIC_URL}/images/${type}.jpg`;
  };

  const containerStyle = {
    backgroundImage: `url("${getBackgroundImageUrl()}")`,
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
