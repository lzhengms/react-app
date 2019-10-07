module.exports = {
    parser: require('postcss-scss'),
    plugins: [
        require('autoprefixer'),
        require('precss')
    ]
}