var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './example/polyfills.ts',
    'vendor': './example/vendor.ts',
    'main': './example/main.ts'
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
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loaders: ['raw-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'vendor', 'polyfills']
    }),

    new HtmlWebpackPlugin({
      template: 'example/index.html'
    }),

    new webpack.ProvidePlugin({
      'jQuery': 'jquery'
    })
  ]
};
