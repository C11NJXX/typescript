```ts
这段内容的核心是 TypeScript 的 ReadonlyArray<T> 类型，它用于描述不可变（只读）的数组，防止修改数组内容。我们来详细解析。

⸻

1. 什么是 ReadonlyArray<T>？

ReadonlyArray<T> 是 TypeScript 提供的特殊数组类型，它和普通数组 Array<T> 类似，但不能修改元素。

✅ 示例

function doStuff(values: ReadonlyArray<string>) {
  // ✅ 允许读取
  console.log(`The first value is ${values[0]}`);
  const copy = values.slice(); // ✅ 允许创建副本

  // ❌ 不能修改
  values.push("hello!"); // ❌ 报错
  values[0] = "new value"; // ❌ 报错
}



⸻

2. ReadonlyArray<T> 的特性
	1.	✅ 允许读取数组元素

console.log(values[0]); // ✅ 读取数据 OK


	2.	✅ 允许创建新数组

const copy = values.slice(); // ✅ OK


	3.	❌ 不允许修改数组内容

values.push("hello!"); // ❌ 报错
values[0] = "new value"; // ❌ 报错



⸻

3. ReadonlyArray<T> vs. 普通数组

对比项	ReadonlyArray	Array
是否可变	❌ 不能修改	✅ 可以修改
是否可以读取	✅ 可以读取	✅ 可以读取
是否可以使用 .push() .pop()	❌ 不能	✅ 可以
是否可以用 slice() 复制	✅ 允许	✅ 允许



⸻

4. ReadonlyArray<T> 的简写

和 Array<T> 也有简写形式：

let arr1: ReadonlyArray<string> = ["red", "green", "blue"];
let arr2: readonly string[] = ["red", "green", "blue"]; // ✅ 等价

推荐使用 readonly Type[]，代码更简洁！

⸻

5. ReadonlyArray<T> 不能用 new 创建

new ReadonlyArray("red", "green", "blue"); // ❌ 报错

错误原因
	•	ReadonlyArray<T> 只是一个类型，它不是 JavaScript 内置的构造函数。
	•	不能直接 new ReadonlyArray()，但可以用普通数组赋值：

const roArray: ReadonlyArray<string> = ["red", "green", "blue"]; // ✅ 正确



⸻

6. 只读数组的赋值规则

TypeScript 不允许 readonly 数组赋值给普通数组！

let x: readonly string[] = [];
let y: string[] = [];

x = y; // ✅ 允许（普通数组可赋值给 `readonly`）
y = x; // ❌ 报错（`readonly` 不能赋值给普通数组）

为什么 y = x; 报错？
	•	readonly string[] 不允许修改，但 string[] 是可修改的。
	•	如果 readonly 数组能赋值给普通数组，普通数组就能修改 readonly 数组的内容，破坏了 readonly 规则。

⸻

7. ReadonlyArray<T> 适用于哪些场景？

✅ 适用于
	•	函数参数（避免修改传入的数组）

function processList(items: readonly number[]) {
  // ✅ 允许读取
  console.log(items.length);

  // ❌ 不能修改
  items.push(5); // ❌ 报错
}


	•	全局常量数组

const COLORS: readonly string[] = ["red", "blue", "green"];
COLORS.push("yellow"); // ❌ 报错


	•	数据共享（防止意外修改）

function getColors(): readonly string[] {
  return ["red", "blue", "green"];
}



🚀 总结
	•	ReadonlyArray<T> 用于创建不可变数组，避免数据被修改。
	•	readonly Type[] 是 ReadonlyArray<T> 的简写，推荐使用。
	•	不能用 new 创建 ReadonlyArray，只能用普通数组赋值。
	•	readonly 数组不能赋值给普通数组，但普通数组可以赋值给 readonly 数组。

✅ 最佳实践

function getItems(): readonly string[] {
  return ["apple", "banana", "orange"];
}
```