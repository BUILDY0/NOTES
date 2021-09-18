import {
    getDOM,
    getResp
} from "./util"
import qs from 'query-string'
const ret = qs.parse(window.location.search);
const url = `/api/local?parentId=${ret.id}`;
getResp(url).then(resp => {
    getDOM('info').innerHTML = '';
    const dd = document.createElement('dd');
    dd.innerHTML = `【${ret.name}】`;
    getDOM('info').appendChild(dd);
    for (const val of resp) {
        const dl = document.createElement('dl');
        dl.innerHTML = val.simpleName;
        getDOM("dd").appendChild(dl);
    }
})