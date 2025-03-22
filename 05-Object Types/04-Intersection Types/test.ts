interface Colorful {
    color: string
}

interface Shape {
    shape: string
}

const obj: Colorful & Shape = { color: 'red', shape: 'square' };

console.log(obj);