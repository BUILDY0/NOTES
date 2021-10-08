window.onload = function () {
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/getData', true);
    xhr.send(null);
    xhr.onreadystatechange = function () {
        if (xhr.status === 200 && xhr.readyState === 4) {
            console.log(xhr.responseText);
            console.log(typeof xhr.responseText);
        }
    }
}