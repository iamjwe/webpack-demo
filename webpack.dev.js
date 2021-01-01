const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/main.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        contentBase: './public',    // web root: ram data and public dir data
        port: 9000,
        proxy: {
            '/api': {
                // http://localhost:8080/api/users -> https://api.github.com/api/users
                target: 'https://api.github.com',
                // http://localhost:8080/api/users -> https://api.github.com/users
                pathRewrite: {
                    '^/api': ''
                },
                // 不能使用 localhost:8080 作为请求 GitHub 的主机名
                changeOrigin: true
            }
        },
        hot: true,  // 替换成功自动刷新，替换失败回退刷新（始终运行正常）
        hotOnly: true,  // 替换成功 / 失败都不刷新（报错时运行失败）
    },
    module: {
        rules: [{
                test: /.vue$/,
                loader: 'vue-loader'
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {
                                targets: "defaults"
                            }]
                        ]
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    "less-loader"
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
                    loader: 'file-loader',
                    options: {
                        esModule: false
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new CleanWebpackPlugin(),
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
        }),
        // new CopyWebpackPlugin({
        //     patterns: [{
        //         from: "public",
        //         to: "public"
        //     }, ]
        // })
    ]
}