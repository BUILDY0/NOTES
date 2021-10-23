function attr(nameOrAge) {
    if (nameOrAge && typeof nameOrAge === 'string') {
        alert('姓名');
    }
    else {
        alert('年龄');
    }
}
attr('212');
