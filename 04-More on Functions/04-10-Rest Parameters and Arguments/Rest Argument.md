//Rest Arguments
```ts
什么是 Spread Arguments（扩展语法）？

“扩展语法” 指的是 将数组或可迭代对象的元素拆开并作为单独的参数传递。
示例：数组的 push 方法

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

arr1.push(...arr2); // ✅ 等价于 arr1.push(4, 5, 6)
console.log(arr1); // [1, 2, 3, 4, 5, 6]

特点
	•	...arr2 将数组 arr2 的元素拆开，作为单独的参数传递给 push 方法。
	•	适用于 数组合并、参数传递 等场景。

⸻

TypeScript 如何推断 Spread Arguments 的类型？

TypeScript 不会假设数组是不可变的，所以 默认推断数组类型为 number[]，而不是固定长度的元组（Tuple）。

示例

const args = [8, 5]; // TypeScript 推断：number[]
const angle = Math.atan2(...args); // ❌ 报错

错误原因
	•	Math.atan2(y, x) 期望 两个独立的 number 参数，即：

function atan2(y: number, x: number): number;


	•	args 被推断为 number[]（可能有 0 个、1 个或多个元素）。
	•	但 Math.atan2 需要 两个精确的 number，所以 TypeScript 不允许将 number[] 直接展开。

⸻

解决方案：使用 as const 让 TypeScript 知道是固定长度的元组

如果你确定 args 只有两个元素，可以使用 as const：

const args = [8, 5] as const;
const angle = Math.atan2(...args); // ✅ 正确

为什么这样可以？
	•	as const 告诉 TypeScript：args 是一个固定长度的元组 [8, 5]，而不是 number[]。
	•	TypeScript 现在推断 args 为：

const args: readonly [8, 5];


	•	这样 Math.atan2(...args) 可以正确匹配 (y: number, x: number)，不会报错。

⸻

 Rest Arguments vs. Spread Arguments

概念	作用	示例
Rest Arguments	函数参数：将多个值收集到一个数组中	function sum(...numbers: number[])
Spread Arguments	展开数组：将数组拆分成单独的参数	Math.max(...[3, 5, 8])



⸻

 总结
	1.	Rest 参数（...args: number[]）
	•	适用于 函数的参数收集。
	•	TypeScript 要求它是数组类型 T[] 或 Array<T>。
	2.	扩展语法（...args）
	•	用于 函数调用或数组操作。
	•	默认情况下，TypeScript 不会推断数组是固定长度，而是 T[]。
	3.	数组推断问题
	•	默认 const args = [8, 5]; 的类型是 number[]，但 Math.atan2(...args) 需要 两个 number，导致错误。
	•	解决方案：使用 as const 声明 固定长度的元组 [8, 5]。

✅ 最佳实践

const args = [8, 5] as const; // 告诉 TypeScript 这是一个元组
const angle = Math.atan2(...args); // ✅ 正确

这样 TypeScript 就不会报错了！🚀
```