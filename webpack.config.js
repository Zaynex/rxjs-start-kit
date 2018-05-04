const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackMerge = require('webpack-merge')

const webpackConfig = {
  entry: {
    'index': './src/index.ts'
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    })
  ],

  mode: 'development',

  module: {
    rules: [
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        loader: 'tslint-loader',
        options: {
          typeCheck: true
        }
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  }
}


const defaultConfig = {
  devtool: 'cheap-module-source-map',
  cache: true,

  resolve: {
    modules: [path.join(__dirname, 'src'), 'node_modules'],
    extensions: ['.ts', '.js']
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 }
  },

  node: {
    global: true,
    crypto: false,
    module: false,
    Buffer: false,
    clearImmediate: false,
    setImmediate: false
  }
}

module.exports = webpackMerge(defaultConfig, webpackConfig)