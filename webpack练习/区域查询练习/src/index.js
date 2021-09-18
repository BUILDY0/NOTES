import {
    getDOM,
    getResp
} from "./util"
getResp("/api/local").then(resp => {
    for (const val of resp) {
        const a = document.createElement('a');
        a.innerHTML = val.simpleName;
        // a.href = `/api/local?parentId=${val.provinceId}`;
        a.href = `/list.html?id=${val.provinceId}&name=${val.simpleName}`
        getDOM("info").appendChild(a);
    }
})