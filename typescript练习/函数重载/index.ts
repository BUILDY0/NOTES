function attr(name: string): string;
function attr(age: number): number;

function attr(nameOrAge: any): any {
    if (nameOrAge && typeof nameOrAge === 'string') {
        alert('姓名');
    } else {
        alert('年龄')
    }
}

attr('212');