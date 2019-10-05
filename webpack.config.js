module.exports = (env) => {
    // 可以获取到命令行上的--env 的参数值
    console.log('env----', env)
    return require(`./webpack/${env}.config`)({
        rootPath: __dirname
    })
}