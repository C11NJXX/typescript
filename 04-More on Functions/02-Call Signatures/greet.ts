type FN = {
    description: string;
    (name: string): string;
}

function greet(fn: FN) {
    console.log(fn.description + fn(' C_11nJxx'))
}

function myFn(name: string) {
    return name;
}

myFn.description = 'This is desc';

greet(myFn);