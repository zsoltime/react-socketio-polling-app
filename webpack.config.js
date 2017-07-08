const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './app/index.html',
  filename: 'index.html',
  inject: 'body',
});
const ExtractTextPluginConfig = new ExtractTextPlugin({
  filename: 'style.css',
});

module.exports = {
  entry: './app/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: 'babel-loader',
      exclude: /(node_modules|server.js)/,
    }, {
      test: /\.s(a|c)ss$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: { sourceMap: true },
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer],
            sourceMap: true,
          },
        }, {
          loader: 'sass-loader',
          options: { sourceMap: true },
        }],
      }),
    }],
  },
  plugins: [
    HtmlWebpackPluginConfig,
    ExtractTextPluginConfig,
  ],
  devtool: 'cheap-module-eval-source-map',
};
