const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: "development",
    watch: true,
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    devServer: {
        open: true,
    },
    output: {
        filename: "index.js",
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js' //内部为正则表达式  vue结尾的
        }
    }
}