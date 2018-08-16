const path = require('path')

module.exports = {
  entry: { www: './src/http/bin/www.js' },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },
  // mode: 'production',
  mode: 'development',
  // devtool: 'inline-source-map',
  target: 'node'
}
