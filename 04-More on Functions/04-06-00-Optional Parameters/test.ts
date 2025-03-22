function f(n?: number) {
    return n;
}

console.log(f(1));
console.log(f());
console.log(f(undefined))

function f2(n: number = 10) {
    return n;
}
//Note that when a parameter is optional, callers can always pass undefined, as this simply simulates a “missing” argument:
console.log(f2(undefined));