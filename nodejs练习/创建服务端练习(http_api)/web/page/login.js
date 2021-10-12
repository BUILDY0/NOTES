window.onload = function () {
    // const xhr = new XMLHttpRequest();
    // xhr.open('get', '/getData?cls=2', true);
    // xhr.send(null);
    // xhr.onreadystatechange = function () {
    //     if (xhr.status === 200 && xhr.readyState === 4) {
    //         console.log(xhr.responseType);
    //         console.log(typeof xhr.responseText);
    //     }
    // }
    fetch('/getData?cls=2').then(res => {
        res.json().then(res => console.log(res))
    })
}