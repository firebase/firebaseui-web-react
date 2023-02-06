/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for t`he specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  context: __dirname,

  entry: './src/App.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public'),
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    alias: {
      react: path.resolve('./node_modules/react'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  plugins: [new MiniCssExtractPlugin({ filename: './bundle.css' })],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: path.resolve(__dirname, './src'),
      },
      {
        test: /\.css$/,
        exclude: [/\.global\./, /node_modules/],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]',
              },
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')(),
                  require('cssnano')({ preset: 'default' }),
                ],
              },
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css/,
        include: [/\.global\./, /node_modules/],
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: false,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require('autoprefixer')(),
                  require('cssnano')({ preset: 'default' }),
                ],
              },
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
};

console.log('Packing for', process.env.NODE_ENV || 'development');

if (process.env.NODE_ENV === 'production') {
  config.devtool = 'source-map';
}

module.exports = config;
