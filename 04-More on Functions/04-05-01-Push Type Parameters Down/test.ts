function first<Type>(arr: Type[]) {
    return arr[0];
}

/**
 * 
 * Rule: When possible, use the type parameter itself rather than constraining it
 * 规则：如果可能，请使用类型参数本身，而不是对其进行约束
 */

function second<Type extends any[]>(arr: Type[]) {
    return arr[1];
}

first([1, 2, 3]);
//不能将类型“number”分配给类型“any[]”。ts(2322)
// second([1, 2, 3]);s