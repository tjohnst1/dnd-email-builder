const path = require('path');

module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: 'bundle.js',
    publicPath: '/dist',
  },
  devServer: {
    inline: true,
    contentBase: './dist',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react'],
        }
      },
      {
        enforce: "pre",
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.svg$/,
        loaders: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['es2015']
            }
          },
          {
            loader: 'react-svg-loader',
            query: {
              jsx: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  }
}
