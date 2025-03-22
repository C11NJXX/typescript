```ts
这段内容主要讲解了 TypeScript 中的 readonly 元组类型，并探讨了如何将元组声明为只读，以及这在函数和代码中的实际应用。我们来逐步解析。

⸻

1. readonly 元组类型

元组类型默认是 可变的，也就是说，你可以修改其中的元素：

let pair: [string, number] = ["hello", 42];
pair[0] = "world"; // ✅ 允许修改

但如果你使用 readonly 修饰符：

function doSomething(pair: readonly [string, number]) {
  pair[0] = "hello!"; // ❌ 报错：不能修改 readonly 元组的元素
}

readonly 元组：
	•	禁止修改 元组中的元素。这样就能够保证数据不会被意外修改，提供更好的类型安全性。
	•	如果你尝试修改其中的任何元素，会报错：

Cannot assign to '0' because it is a read-only property.



⸻

2. readonly 元组与 const 断言

TypeScript 还可以通过 const 断言 推断出 readonly 元组类型：

let point = [3, 4] as const;

推断结果：
	•	point 的类型是 readonly [3, 4]，即一个 只读元组，长度为 2，第一个元素是 3（数字），第二个是 4（数字）。

as const 断言的作用
	•	as const 断言让 TypeScript 推断出 不可变 的元组类型，元素的类型被推断为 字面量类型，而不是普通的 number 类型。

⸻

3. 只读元组和函数参数

有时，函数需要接收 只读元组，但你可能会遇到不兼容的情况，即函数需要一个 可变的元组类型，而实际传入的是 只读元组。

示例：distanceFromOrigin 函数

function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}

distanceFromOrigin 期望接收一个可变的元组 [number, number]，但你传入了 只读元组 readonly [3, 4]：

let point = [3, 4] as const;  // readonly [3, 4]
distanceFromOrigin(point); // ❌ 报错

报错原因：
	•	point 是 只读元组 readonly [3, 4]，而 distanceFromOrigin 需要 可变元组 [number, number]。
	•	TypeScript 无法保证 readonly 元组的元素不会被修改，因此它无法将 readonly [3, 4] 赋值给 [number, number]。

⸻

4. 解决方案：使用 readonly 或修改函数签名

你可以 让函数接受 readonly 元组，或者使用 类型断言 来绕过类型检查。

方法 1：让函数接受 readonly 元组

function distanceFromOrigin([x, y]: readonly [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}

这样就能接受 readonly 元组，例如：

let point = [3, 4] as const;
distanceFromOrigin(point); // ✅ 正常工作

方法 2：使用类型断言

如果你确定不会修改 point 的元素，可以使用类型断言来绕过类型检查：

distanceFromOrigin(point as [number, number]); // ✅ 强制转换为可变元组

但这种做法不如直接让函数支持 readonly 元组好，会失去类型安全。

⸻

5. 总结
	•	readonly 元组：用于确保元组元素 不可变。一旦声明为 readonly，你不能修改其中的元素。
	•	as const 断言：将数组或元组声明为 只读字面量 类型，推断为 readonly [3, 4] 而不是 [number, number]。
	•	readonly 与函数参数：如果函数需要可变的元组类型，但你传入了只读元组，会导致类型不兼容。
	•	解决方案：可以通过 修改函数签名，让它接受 readonly 元组，或者使用 类型断言 来绕过检查。

⸻

💡 最佳实践
	•	尽量使用 readonly 元组，提高代码的类型安全性，避免意外修改。
	•	如果元组不需要修改，使用 as const 断言，让 TypeScript 自动推断为只读元组。
	•	函数参数应支持 readonly 元组，如果你传入不可变的值时，避免不必要的类型错误。
```