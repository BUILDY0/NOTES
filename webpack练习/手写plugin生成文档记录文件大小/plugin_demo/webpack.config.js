const myplugin = require('./plugins/myplugin')


module.exports = {
    mode: "development",
    devtool: "source-map",
    plugins: [new myplugin()],
}