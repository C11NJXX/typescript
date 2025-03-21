function showName(fn: (name: string) => void) {
    fn('Hi');
}

function greet(name: string) {
    console.log(name);
}

showName(greet);