'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './app/index.js',

  devtool: 'source-map',

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  resolve: {
    modules: ["app/components", "app/reducers", "node_modules"]
  },

  module: {
    rules: [
      {
        test: /(\.js|\.jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000
  },

  plugins: [
    // cleaning up the destination directory before writing new files
    new CleanWebpackPlugin(['dist']),

    new HtmlWebpackPlugin({
      title: 'TodoApp',
      template: 'index_template.ejs'
    })
  ]
}
