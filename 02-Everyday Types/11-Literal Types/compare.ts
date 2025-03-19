function compare(
    x: string,
    y: string
):
    | 1
    | 0 {
    //不能将类型“-1”分配给类型“0 | 1”。
    //return x === y ? 1 : -1
    return x === y ? 1 : 0;
}

console.log(compare('a', 'a'));
console.log(compare('a', 'b'));