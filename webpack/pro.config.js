const path = require('path')
const webpack =  require('webpack')
const webpackMerge =  require('webpack-merge')
const MiniCssExtractPlugin =  require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const options = {
    loaders: {
        styles: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
        images: [
            'url-loader?limit=50000&name=[path][name].[ext]?[hash:8]',
            {
                // 图片进行压缩
                loader: 'img-loader',
                options: {
                    // 根据环境判断是否启用资源压缩
                    // enabled: process.env.NODE_ENV === 'production',
                    gifsicle: {
                      interlaced: false // 替换使用渐进式渲染
                    },
                    mozjpeg: {
                      progressive: true // 创建基准jpeg文件
                    },
                    optipng: {
                      optimizationLevel: 4 // 优化级别，0-7，值越大，压缩越多
                    },
                    pngquant: {
                      quality: '75-90', // 压缩质量，0-100，值越高，质量越高
                      floyd: 0.5, // 图片抖动值，0-1，越高抖动越厉害
                      speed: 2 // 执行速度，0-10，速度过高质量受损，不建议过高
                    },
                    svgo: {
                      plugins: [
                        { removeTitle: true }, // 去除标题信息
                        { convertPathData: false } // 转换路径为更短的相对或决定路径
                      ]
                    }
                  }
            }
        ],
        iconFonts: 'url-loader?limit=10000&name=[path][name].[ext]?[hash:8]'
    },
    global: {
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      },
      '__DEV__': false
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // css提取
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        })
    ]
}
module.exports = ({rootPath}) => {
    options.rootPath = rootPath
    return webpackMerge(require('./_base')(options), {
        mode: 'production',
        optimization: {
          // 提取公公代码块
          splitChunks: {
            minSize:30000,
            chunks: all,
            miniChunks: 1
          },
          // 压缩js
          minimizer: [
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
          ]
        }

    })
}