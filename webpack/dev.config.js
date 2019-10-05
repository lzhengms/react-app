/** 
 * webpack的本地开发的配置
*/
const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')

const PORT = '9000' // 端口号
const publicPath = '/static/'


const options = {
    publicPath,
    loaders: {
        styles: [ 'style-loader', 'css-loader', 'postcss-loader',  ],
        images: 'url-loader?limit=50000&name=[path][name].[ext]?[hash:8]',
        iconFonts: 'url-loader?limit=10000&name=[path][name].[ext]?[hash:8]'
    },
    global: {
        'process.env': {
            'NODE_ENV': JSON.stringify('dev')
          },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin() // 开启webpack的热替换
    ]
}

module.exports = ({ rootPath }) => {
   options.rootPath = rootPath
   return webpackMerge(require('./_base')(options), {
       devtool: 'source-map',
       mode: 'development',
       devServer: {
           contentBase: path.join(rootPath, './src'),
           port: PORT,
           inline: true,
           hot: true, // 开启热刷新
           historyApiFallback: true,
           host: 'localhost',
           proxy: {
               '/': {
                   bypass: () => {
                       return `${publicPath}index.html`
                   }
               }
           }
       }
   })
}