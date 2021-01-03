const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './public', // web root: ram data and public dir data
    port: 9000,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin()
  ]
})
