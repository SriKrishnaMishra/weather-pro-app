const path = require('path');

module.exports = function override(config) {
  // Add alias for src directory to help with absolute imports
  config.resolve.alias['src'] = path.resolve(__dirname, 'src');
  
  return config;
};
