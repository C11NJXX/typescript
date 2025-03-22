```ts
这段内容讨论了 TypeScript 中的泛型参数默认值，并展示了如何通过为泛型类型参数声明默认值来简化函数签名。我们来逐步解析这些概念。

⸻

1. 泛型参数默认值的作用

通过为泛型类型参数声明默认值，可以使得泛型参数变得可选。如果调用函数时没有显式指定类型参数，则会使用默认值。这可以减少代码的复杂性，尤其是在某些情况下，默认类型已经足够满足需求。

示例：创建 HTMLElement 函数

没有默认值的实现

在没有泛型默认值的情况下，函数的签名可能如下所示：

declare function create(): Container<HTMLDivElement, HTMLDivElement[]>;
declare function create<T extends HTMLElement>(element: T): Container<T, T[]>;
declare function create<T extends HTMLElement, U extends HTMLElement>(
  element: T,
  children: U[]
): Container<T, U[]>;

	•	第一个函数不带参数，默认返回 HTMLDivElement 类型。
	•	第二个函数接受一个 HTMLElement 类型的 element 参数。
	•	第三个函数接受 element 和 children 两个参数，children 是一个 HTMLElement[] 数组。

使用泛型参数默认值

通过为泛型类型参数添加默认值，可以将多个签名合并为一个更简洁的版本：

declare function create<T extends HTMLElement = HTMLDivElement, U extends HTMLElement[] = T[]>(
  element?: T,
  children?: U
): Container<T, U>;

解释：
	•	T extends HTMLElement = HTMLDivElement：T 默认是 HTMLDivElement 类型，除非在调用时显式传入其他类型。
	•	U extends HTMLElement[] = T[]：U 默认是 T[] 类型，即 T 类型的数组。

调用示例：

const div = create(); // 使用默认类型，创建 HTMLDivElement
// div: Container<HTMLDivElement, HTMLDivElement[]>

const p = create(new HTMLParagraphElement());
// p: Container<HTMLParagraphElement, HTMLParagraphElement[]>

	•	create() 调用时没有传入 element，因此 T 默认为 HTMLDivElement，U 默认为 HTMLDivElement[]。
	•	create(new HTMLParagraphElement()) 调用时传入了 HTMLParagraphElement，所以 T 被推断为 HTMLParagraphElement，U 被推断为 HTMLParagraphElement[]。

⸻

2. 泛型参数默认值的规则

（1）默认值使类型参数变为可选

如果一个泛型类型参数有默认值，该类型参数就是可选的。例如，在上面的 create 函数中，T 和 U 都有默认值，调用时可以选择传入或不传入类型参数。

（2）必需类型参数不能在可选类型参数后面

TypeScript 要求必需的类型参数必须出现在 可选类型参数之前。因此，以下代码是无效的：

declare function create<T extends HTMLElement, U extends HTMLElement[] = T[]>(element: T, children?: U): Container<T, U>;

	•	U 是带默认值的可选参数，而 T 是必需的类型参数。TypeScript 会报错，提示必须先声明必需的类型参数。

（3）默认类型必须满足类型参数的约束

如果为类型参数指定了默认值，并且该类型参数有约束，默认值必须符合约束。例如：

declare function create<T extends HTMLElement = HTMLDivElement>(element: T): Container<T>;

	•	这里，T 的默认值是 HTMLDivElement，它符合 T extends HTMLElement 的约束。

（4）未指定类型参数时，使用默认值

当调用泛型函数时，如果没有显式指定类型参数，TypeScript 会使用默认值推断类型：

create(); // `T` 默认为 `HTMLDivElement`

如果无法推断出默认值，TypeScript 会使用指定的默认类型。

（5）类型推断失败时使用默认类型

如果默认类型已指定，但类型推断无法选择合适的候选类型，则会使用默认类型：

create(new HTMLParagraphElement()); // `T` 被推断为 `HTMLParagraphElement`

（6）类或接口合并时添加默认类型参数

当类或接口声明与现有类或接口声明合并时，可以为现有类型参数引入默认值：

interface Container<T> {
  value: T;
}
interface Container<T = string> {
  value: T;
}

	•	这里的 T 默认为 string，这样即使没有提供 T 的类型参数，Container 也会使用 string 类型。

（7）合并时引入新的类型参数

在接口或类声明合并时，可以引入新的类型参数，并为其指定默认值：

interface Container<T = string, U = number> {
  value: T;
  count: U;
}



⸻

3. 总结

泛型参数默认值的使用
	•	默认值使泛型参数可选，使得调用时可以不指定类型，TypeScript 会自动使用默认值。
	•	默认值必须符合类型参数的约束，如果有约束的话。
	•	必需的类型参数必须出现在可选类型参数之前。
	•	默认类型的推断：如果未显式传入类型参数，TypeScript 会根据函数的调用自动推断默认类型。

常见应用场景
	•	简化函数签名：通过为泛型参数指定默认值，减少函数重载的数量，简化代码。
	•	创建元素的工厂函数：例如创建 HTMLElement 元素时，可以通过默认值快速生成常用元素类型，如 HTMLDivElement。

⸻

💡 最佳实践：
	•	在函数或类中使用泛型参数默认值时，尽量选择常用的类型作为默认值，简化调用，提高代码的可读性和复用性。
	•	确保默认类型符合约束，以避免类型错误。
```