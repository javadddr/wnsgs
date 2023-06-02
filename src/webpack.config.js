const path = require('path');

module.exports = {
  // ... other configuration options
  resolve: {
    fallback: {
      path: require.resolve('path-browserify')
    }
  }
};
