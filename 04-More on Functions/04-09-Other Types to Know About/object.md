```ts
特殊类型 object 指的是任何非原始值（ string 、 number 、 bigint 、 boolean 、 symbol 、 null 或 undefined ）。
这与空对象类型 { } 不同，也与全局类型 Object 不同。
您很可能永远不会使用 Object 。

object 不是 Object 。 请始终使用 object ！

请注意，在 JavaScript 中，函数值是对象：它们具有属性，
原型链中有 Object.prototype ，是 instanceof Object ，
可以对它们调用 Object.keys ，等等。
因此，在 TypeScript 中，函数类型被视为 object 。
```

```ts
这段内容的核心是解释 TypeScript 中 object 类型和 Object 类型的区别，以及 object 类型的特殊含义。

⸻

1. object 类型 vs. Object 类型 vs. {}

（1）object 类型

object 类型是 TypeScript 提供的一个特殊类型，它代表 “任何非原始值”。

✅ 可以是：
	•	{}（普通对象）
	•	function（函数）
	•	[]（数组）
	•	new Date()（日期对象）
	•	Map, Set, RegExp（ES6 内置对象）

❌ 不能是：
	•	string
	•	number
	•	bigint
	•	boolean
	•	symbol
	•	null
	•	undefined

示例：

let obj1: object = { name: "Alice" }; // ✅ OK
let obj2: object = [1, 2, 3]; // ✅ OK
let obj3: object = new Date(); // ✅ OK

let obj4: object = "hello"; // ❌ 错误，string 不是 object
let obj5: object = 123; // ❌ 错误，number 不是 object



⸻

（2）全局 Object 类型

Object（首字母大写）是 JavaScript 语言本身的内置类型，它几乎匹配所有值，包括原始类型，因此 不要使用 Object 作为类型。

let obj: Object; 

obj = { key: "value" }; // ✅ OK
obj = "hello"; // ✅ OK，string 也可以赋值
obj = 42; // ✅ OK，number 也可以赋值

问题： Object 包含了所有类型（包括原始类型），这与 object 不同，所以 TypeScript 不建议使用 Object。

⸻

（3）空对象类型 {}

{} 类型是 一个空对象类型，但它实际上允许任何值，包括原始类型！

let obj: {}; 

obj = {}; // ✅ OK
obj = "hello"; // ✅ OK
obj = 42; // ✅ OK
obj = []; // ✅ OK
obj = function() {}; // ✅ OK

问题： {} 允许任何值，而 object 只允许非原始类型，所以 {} 也不适合作为通用的对象类型。

⸻

2. object 在 TypeScript 中的用途
	•	object 可以用来限制变量只能是对象，而不能是原始类型。
	•	适用于只关心 “它是对象”，但不关心对象的具体结构的情况。

function useObject(obj: object) {
    console.log(obj);
}

useObject({ key: "value" }); // ✅ OK
useObject([1, 2, 3]); // ✅ OK
useObject(new Date()); // ✅ OK

useObject("hello"); // ❌ 报错，string 不是 object
useObject(42); // ❌ 报错，number 不是 object

⚠️ 但 object 不允许你访问对象的属性：

let obj: object = { name: "Alice" };
console.log(obj.name); // ❌ 报错：Property 'name' does not exist on type 'object'.

解决方案：
	•	如果你知道对象的具体结构，应该使用 接口（interface）或类型（type）：

interface User {
  name: string;
}

let user: User = { name: "Alice" };
console.log(user.name); // ✅ OK



⸻

3. 为什么函数在 JavaScript 和 TypeScript 中是 object？

在 JavaScript 中，函数其实是一种对象：
	•	函数有 prototype，继承自 Object.prototype
	•	函数可以有属性，例如 function.name
	•	typeof function 是 "function"，但 function instanceof Object 是 true

function myFunction() {}
console.log(typeof myFunction); // "function"
console.log(myFunction instanceof Object); // true
console.log(Object.keys(myFunction)); // []

由于 JavaScript 规定函数是对象的一种，所以 TypeScript 也认为函数是 object：

let obj: object = function() {}; // ✅ OK

但如果你希望 object 仅代表“普通对象”而不包括函数，可以使用 Record<string, any> 或 {} & object：

let obj: Record<string, any> = {}; // 只允许普通对象
obj = function() {}; // ❌ 报错，函数不符合 Record<string, any>



⸻

4. 结论

✅ object（推荐）
	•	代表“任何非原始类型”
	•	适用于**泛指“某种对象”**的场景
	•	不包含 string、number、boolean 等原始类型
	•	不能访问对象的属性（不像 {} ）

🚫 Object（不推荐）
	•	匹配所有类型（包括 string、number 等）
	•	几乎永远不应该使用，因为它没有实际限制作用

⚠️ {}（不推荐）
	•	允许任何值，包括原始类型
	•	不会限制变量必须是对象，用处不大

⸻

最佳实践

✅ 如果你希望变量是某种对象，而不关心具体结构，使用 object：

let obj: object = {};  // ✅ OK
obj = [];              // ✅ OK
obj = new Date();      // ✅ OK
obj = 42;             // ❌ 报错

✅ 如果你知道对象的具体结构，使用 interface 或 type：

interface User {
  name: string;
  age: number;
}

let user: User = { name: "Alice", age: 25 };

✅ 如果要表示任意键值对的对象，而不允许函数作为值，使用 Record<string, any>：

let obj: Record<string, any> = { key: "value" };
obj = function() {}; // ❌ 报错

🚫 不要使用 Object，因为它包含了所有类型，包括原始类型。

🚫 不要使用 {} 作为通用对象类型，因为它允许所有类型，包括 string 和 number。

⸻

总结
	1.	object ≠ Object，它们是不同的类型：
	•	object ✅ 代表“所有非原始值”。
	•	Object 🚫 代表“几乎所有类型”（包括原始类型），不推荐使用。
	•	{} 🚫 允许“所有值”（包括原始类型），也不推荐使用。
	2.	在 TypeScript 中，函数本质上也是 object，因为 JavaScript 规定函数是对象。
	3.	object 适用于泛指“某种对象”的情况，但不能访问对象的属性。
	4.	如果你希望定义一个具体的对象类型，应该使用 interface 或 type，而不是 object。
```