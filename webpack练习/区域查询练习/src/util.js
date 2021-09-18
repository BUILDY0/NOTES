export async function getResp(url) {
    return await fetch(url).then(resp => resp.json())
}
export function getDOM(dom) {
    return document.getElementsByClassName(dom)[0] || document.getElementById(dom) || document.getElementsByTagName(dom)[0];
}