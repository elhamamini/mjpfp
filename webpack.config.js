const path = require('path');
module.exports = {
  mode: 'development',
  entry: path.join(__dirname, './client/index.js'),
  output: {
    path: path.join(__dirname, './static')
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
