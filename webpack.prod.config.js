const base = require('./webpack.base.config');
const path = require('path');

module.exports = {
  ...base,
  mode: 'production',
  performance: {
    maxEntrypointSize: 90000
  }
};
