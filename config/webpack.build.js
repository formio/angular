var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'formio': helpers.root('src') + '/formio.ts'
  },
  output: {
    path: helpers.root('dist'),
    publicPath: '/',
    filename: '[name].min.js'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.css']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts'
      },
      {
        test: /\.html/,
        loader: 'html'
      },
      {
        test: /\.css$/,
        loader: 'css'
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
