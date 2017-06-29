var webpack = require('webpack')
var autoprefixer = require('autoprefixer')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var inProduction = (process.env.NODE_ENV === 'production')

var config = {
  entry: path.resolve(__dirname, './src/index.js'),

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.js', '.json']
  },

  devServer: {
    port: 3000,
    // hot: true,
    contentBase: path.resolve(__dirname, 'public'),
    publicPath: '/' // publicPath is relative to contentBase
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'eslint-loader'
      },

      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        use: ['react-hot-loader', 'babel-loader']
      },

      {
        test: /\.sass$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { url: false }
            },
            'postcss-loader',
            'sass-loader'
          ],
          fallback: 'style-loader'
        })
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { url: false }
            }
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
    new webpack.LoaderOptionsPlugin({
      minimize: inProduction
    })
  ]
}

if (inProduction) {
  config.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      sourcemap: true,
      compressor: {
        warnings: false
      }
    })
  )
}

module.exports = config
