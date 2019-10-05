
/**
 * 默认的配置
 */
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (options) => {
    const rootPath = options.rootPath || path.resolve(__dirname, '../')
    const publicPath = options.publicPath || 'assest'
    return {
        name: 'mywebpack',
        context: path.resolve(rootPath, 'src/'),
        entry: {
            app: './index.js'
        },
        output: {
            publicPath,
            path: path.resolve(rootPath, 'dist/'),
            filename: '[name].[hash].js',
            chunkFilename:'[hash].js'
        },
        resolve: {
            modules: [ 'node_modules' ],
            alias: {

            },
            extensions: ['.js', '.jsx', '.json']
        },
        module: {
            rules: [
                {
                    // 解析js
                    test: /\.jsx?/,
                    exclude: /node_modules/,
                    use: ['babel-loader']
                    /* use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env'
                            ]
                        }
                    } */
                },
                {  // 解析css 
                    test: /\.s?[ac]ss/,
                    use: options.loaders.style
                },
                {
                    // 解析图片
                    test: /\.(png|jpe?g|gif|svg)/,
                    use: options.loaders.imges
                },
                {
                    // 解析字体
                    test: /\.(woff|woff2|eot|ttf|otf)/,
                    use: options.loaders.iconFonts
                }
            ]
        },
        plugins: (options.plugins || []).concat(
            // 定义全局的变量
            new webpack.DefinePlugin(options.global),
            // 生成index.html，注入js
            new HtmlWebpackPlugin({
                filename: 'index.html', // 生成位置是相对于output.path的路径
                hash: false,
                inject: true,
                template: path.resolve(rootPath, 'public/index.html'),
                minify: {
                    // 压缩html文件
                    collapseWhitespace: true,
                    removeComments: true,
                    removeAttributeQuotes: true
                }
            })
        )
    }
}