module.exports = {
    publicPath: '//localhost:20000/',
    devServer: {
        port: 20000,
        headers: {
            'Access-Control-Allow-Origin': '*',
        }
    },
    configureWebpack: {
        output: {
            libraryTarget: 'umd',
            library: 'm-vue',
        }
    }
}