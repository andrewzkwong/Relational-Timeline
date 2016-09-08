var webpack = require('webpack');

module.exports = {
  entry: './src/index',
  output: {
    filename: 'browser-bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.(js|jsx)$/,exclude: [/node_modules/],  loader: 'babel-loader',  query: {presets: ['es2015', 'react']},},
      {test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.md']
  }
};
