const base = require('./webpack.base.config');
const path = require('path');

module.exports = {
  ...base,
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
    open: false,
    contentBase: path.join(__dirname, 'build'),
    watchContentBase: true,
    historyApiFallback: true,
    disableHostCheck: true,
    stats: 'errors-only',
    overlay: true,
    hotOnly: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
};
