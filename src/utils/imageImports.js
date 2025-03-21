// Centralized image import utility
const importImage = (imageName) => {
  try {
    return require(`../assets/images/${imageName}`).default;
  } catch (error) {
    console.error(`Failed to import image: ${imageName}`, error);
    // Fallback to a default image or return a placeholder
    return 'path/to/default/image.jpg';
  }
};

export const weatherImages = {
  Fog: importImage('Fog.jpg'),
  Snow: importImage('Snow.jpg'),
  // Add more weather types as needed
};

export default importImage;
