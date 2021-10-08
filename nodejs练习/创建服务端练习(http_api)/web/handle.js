function getData2(req, res) {
    res.writeHead(200);
    res.write('hi');
    res.end()
}
const path = new Map();
path.set('/getData2', getData2);
module.exports.path = path;