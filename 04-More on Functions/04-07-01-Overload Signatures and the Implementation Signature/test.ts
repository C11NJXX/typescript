function fn(x: string): void; // 函数重载签名
function fn() { // 实现签名
    console.log('...');
}

//fn(); // ❌ 报错
// 报错的核心问题是：
// 	1.	重载签名 规定了 fn 必须 传入一个 string 参数。
// 	2.	但是 实现签名（即 function fn() {}）没有参数，这导致 TypeScript 无法匹配 fn(x: string): void; 的定义。

// 因此，当你调用 fn(); 时，TypeScript 检测到 实现签名不接受参数，而重载签名只允许 string 类型参数，这就导致了错误。