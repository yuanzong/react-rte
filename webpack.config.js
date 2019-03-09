/*eslint-env node */
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  {
    entry: './src/RichTextEditor.js',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'react-rte.js',
      libraryTarget: 'commonjs2',
    },
    externals: {
      react: 'react',
      'react-dom': 'react-dom',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
  },
  {
    entry: './src/demo.js',
    output: {
      path: path.join(__dirname, 'dist'),
      publicPath: '/dist/',
      filename: 'demo.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
              },
            },
          ],
        },
      ],
    },
  },
];
