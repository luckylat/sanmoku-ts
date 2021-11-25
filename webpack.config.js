const path = require('path');

module.exports = {

  mode: 'development',

  entry: './src/index.tsx',

  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'build')
  },

  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        }
      },
      {
        test: /\.css$/,
        use: {
          loader: 'css-loader'
        }
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, 'build')
  }

};