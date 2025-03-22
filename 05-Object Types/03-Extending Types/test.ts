interface Colorful {
    color: string
}

interface Shape {
    shape: string
}

interface Obj extends Colorful, Shape { }

const obj: Obj = { color: 'red', shape: 'square' };

console.log(obj);