// Centralized image import utility
const importImage = (imageName) => {
  try {
    // Try multiple import strategies
    const importPaths = [
      `../assets/images/${imageName}`,
      `../../assets/images/${imageName}`,
      `./assets/images/${imageName}`
    ];

    for (const path of importPaths) {
      try {
        return require(path).default;
      } catch (innerError) {
        console.warn(`Failed to import image from path: ${path}`, innerError);
      }
    }

    // If all import attempts fail, return a fallback
    console.error(`Could not import image: ${imageName}`);
    return 'path/to/default/image.jpg';
  } catch (error) {
    console.error(`Unexpected error importing image: ${imageName}`, error);
    return 'path/to/default/image.jpg';
  }
};

export const weatherImages = {
  Fog: importImage('Fog.jpg'),
  Snow: importImage('Snow.jpg'),
  // Add more weather types as needed
};

export default importImage;
