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

const config = {
  context: __dirname,

  entry: './src/FirebaseAuth.jsx',
  output: {
    filename: 'StyledFirebaseAuth.js',
    path: path.resolve(__dirname, './dist'),
    library: {
      name: 'StyledFirebaseAuth',
      type: 'umd',
    },
  },
  externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'React',
      root: 'React',
    },
    firebase: {
      commonjs: 'firebase',
      commonjs2: 'firebase',
      amd: 'firebase',
      root: 'firebase',
    },
    'firebase/auth': {
      commonjs: 'firebase/auth',
      commonjs2: 'firebase/auth',
      amd: 'firebase/auth',
      root: 'firebase/auth',
    },
    firebaseui: {
      commonjs: 'firebaseui',
      commonjs2: 'firebaseui',
      amd: 'firebaseui',
      root: 'firebaseui',
    },
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path.resolve(__dirname, './src'),
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

module.exports = config;
