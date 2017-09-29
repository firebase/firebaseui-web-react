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

  entry: './src/App.jsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './public')
  },
  devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  plugins: [new ExtractTextPlugin('./bundle.css')],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [path.resolve('frontend'), path.resolve('node_modules/preact-compat/src')],
        query: {
          babelrc: false,
          presets: [
            "react",
            ["env", {
              "targets": {
                "browsers": "last 2 versions"
              },
              "loose": true,
              "modules": "commonjs"
            }]
          ],
          "plugins": [
            "transform-decorators",
            "transform-class-properties",
            "transform-object-rest-spread"
          ]
        }
      },
      {
        test: /\.css$/,
        exclude: [/\.global\./, /node_modules/],
        loader: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use:[
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: true,
                  autoprefixer: true,
                  minimize: true,
                  localIdentName: '[name]__[local]___[hash:base64:5]'
                }
              }
            ]
          })
      },
      {
        test: /\.css/,
        include: [/\.global\./, /node_modules/],
        loader: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use:[
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: false,
                  minimize: true
                }
              }
            ]
          })
      },
      {/* Workaround for issue https://github.com/firebase/firebaseui-web/issues/163 */},
      {
        test: /npm\.js$/,
        loader: 'string-replace-loader',
        include: path.resolve('node_modules/firebaseui/dist'),
        query: {
          search: 'require(\'firebase\');',
          replace: 'require(\'firebase/app\');require(\'firebase/auth\')',
        }
      }
    ]
  }
};

console.log('Packing for', process.env.NODE_ENV || 'development');

if (process.env.NODE_ENV === 'production') {
  config.devtool = 'source-map';
}

module.exports = config;
