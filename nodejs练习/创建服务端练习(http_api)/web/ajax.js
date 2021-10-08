function getData(req, res) {
    res.writeHead(200);
    res.write('hello');
    res.end()
}
const path = new Map();
path.set('/getData', getData);
module.exports.path = path;