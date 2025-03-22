function sum({ a, b, c }: { a: number; b: number; c: number }): number {
    return a + b + c;
}

console.log(sum({ a: 1, b: 2, c: 3 }));

type ABC = { a: number; b: number; c: number };
function sum2({ a, b, c }: ABC): number {
    return a + b + c;
}
console.log(sum2({ a: 1, b: 2, c: 3 }));