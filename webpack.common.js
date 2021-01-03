const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: 'defaults'
              }]
            ]
          }
        },
        {
          loader: 'eslint-loader'
        }
      ]
    },
    {
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader'
      ]
    },
    {
      test: /.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.(png|jpe?g|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 10 * 1024, // 10kb以下的模块文件以DataUrl的形式嵌入在·bundle.js中
          esModule: false
        }
      }
    }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // 用于生成 index.html
    new HtmlWebpackPlugin({
      title: 'Webpack Tutorials',
      meta: {
        viewport: 'width=device-width'
      },
      template: './src/index.html',
      templateParameters: {
        BASE_URL: './public/'
      }
    })
  ]
}
