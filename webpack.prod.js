const {
  merge
} = require('webpack-merge')
const common = require('./webpack.common')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    // 用于生成 index.html
    new CopyWebpackPlugin({
      patterns: [{
        from: 'public',
        to: 'public'
      }]
    })
  ]
})
