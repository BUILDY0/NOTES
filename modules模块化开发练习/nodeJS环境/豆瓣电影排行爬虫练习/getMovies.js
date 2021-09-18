const axios = require('axios'),
    cheerio = require('cheerio'),
    fs = require('fs');

async function getHTML(url) {
    const resp = await axios.get(url);
    const data = resp.data;
    const ret = await getMoviesData(data);
    fs.writeFile('./movie.json', JSON.stringify(ret), () => {
        console.log('success!');
    })
}
async function getMoviesData(HTML) {
    const $ = await cheerio.load(HTML);
    const ranks = []
    const trs = $('tr.item');
    for (let i = 0; i < trs.length; i++) {
        const obj = {};
        obj.title = trs.find('div.pl2 a').eq(i).text().replace(/\s/g, '').split('/')[0];
        obj.imgSrc = trs.find('a.nbg img').eq(i).attr('src');
        obj.desc = trs.find('p.pl').eq(i).text();
        ranks.push(obj);
    }
    return ranks;
}
getHTML('https://movie.douban.com/chart');