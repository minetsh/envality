const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
  watch: false,
  mode: 'development',
  entry: '../src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    library: 'envality',
    libraryTarget: 'window',
    filename: 'index.js',
    path: path.resolve(__dirname, '../lib'),
  },
};
