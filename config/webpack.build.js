var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'formio': helpers.root('src') + '/bootstrap.ts'
  },
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].bootstrap.min.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'css'
      },
      {
        test: /\.ts$/,
        loader: 'ts'
      },
      {
        test: /\.html/,
        loader: 'html'
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/^@angular/),
    new webpack.IgnorePlugin(/^rxjs/),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
