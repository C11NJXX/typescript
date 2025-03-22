// Rest Parameters
function multiply(n: number, ...m: number[]) {
    return m.map((x) => n * x);
}
// 'a' gets value [10, 20, 30, 40]
const a = multiply(10, 1, 2, 3, 4);
console.log(a)

function myMultiply(n: number, arr: number[]) {
    return arr.map(v => n * v);
}

//应有 2 个参数，但获得 5 个。ts(2554)
// const b =myMultiply(10, 1, 2, 3, 4);
const b = myMultiply(10, [1, 2, 3, 4])
console.log(b)