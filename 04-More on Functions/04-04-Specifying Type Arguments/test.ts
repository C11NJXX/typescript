function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
}

console.log(combine([1, 2, 3], [4, 5, 6]));

//不能将类型“number”分配给类型“string”
//combine(['1', '2'], [1, 2, 3]);

//OK
console.log(combine<number | string>(['1', '2'], [1, 2, 3]));