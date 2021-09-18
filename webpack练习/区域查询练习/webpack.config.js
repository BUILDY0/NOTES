const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')


module.exports = {
    mode: "development",
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: "main.html",
            template: "./public/main.html",
            chunks: ["main"]
        }),
        new HtmlWebpackPlugin({
            filename: "list.html",
            template: "./public/list.html",
            chunks: ["list"],
        }),
        new CopyWebpackPlugin([{
            from: "src/img",
            to: "src/img"
        }, {
            from: "src/css",
            to: "src/css"
        }])
    ],
    stats: {
        colors: true,
        chunkModules: false,
    },
    devtool: "source-map",
    entry: {
        main: "/src/index.js",
        list: "/src/list.js"
    },
    output: {
        filename: "scripts/[name].[chunkhash:5].js",
        // publicPath: "/"
    },
    devServer: {
        open: true,
        openPage: "main.html",
        proxy: {
            "/api": {
                target: "https://study.yuanjin.tech",
                changeOrigin: true
            }
        }
    }

}