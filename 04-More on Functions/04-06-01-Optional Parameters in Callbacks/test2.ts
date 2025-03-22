function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
    for (let i = 0; i < arr.length; i++) {
        callback(arr[i]);
    }
}

myForEach([1, 2, 3], (arg, index) => {
    console.log(arg);
    //“index”可能为“未定义”。ts(18048)
    // index.toFixed(2);

    // index?.toFixed;
})

/**
 * Rule: When writing a function type for a callback, never write an optional parameter unless you intend to call the function  *without passing that argument
 *规则 ：在为回调编写函数类型时， 切勿编写可选​​参数，除非你打算在不传递该参数的情况下调用该函数
 */