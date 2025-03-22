```ts
这段内容的重点是 TypeScript 中的接口扩展（extends）与交叉类型（&）的区别，特别是在属性冲突时的不同处理方式。我们来详细解析。

⸻

1. 接口扩展（Interface Extension）

extends 关键字用于继承其他接口，并在属性兼容的情况下进行合并。

示例：接口扩展

interface Person {
  name: string;
}

interface Employee extends Person {
  salary: number;
}

const emp: Employee = {
  name: "Alice",
  salary: 50000,
};

✅ 解释
	•	Employee 继承 了 Person，所以它必须包含 name 和 salary 两个属性。
	•	属性不会发生冲突，如果 Person 里 name: string，Employee 里不能声明 name: number，否则会报错。

⸻

2. 接口合并（Interface Merging）

如果两个接口 名字相同，TypeScript 会自动合并它们，但如果属性类型冲突，就会报错。

interface Person {
  name: string;
}

interface Person {
  age: number;
}

// TypeScript 会合并这两个接口，相当于：
/*
interface Person {
  name: string;
  age: number;
}
*/

const p: Person = {
  name: "Alice",
  age: 25,
};

✅ 解释
	•	Person 被合并，现在 Person 既包含 name，也包含 age。

但如果有冲突的类型，就会报错

interface Person {
  name: string;
}

interface Person {
  name: number; // ❌ 报错：属性 `name` 类型不兼容
}

Interface 'Person' incorrectly extends interface 'Person'.
Types of property 'name' are incompatible.
Type 'number' is not assignable to type 'string'.

💡 规则
	•	相同的属性必须类型一致，否则报错。
	•	多个 interface 共享同名时，TypeScript 会自动合并。

⸻

3. 交叉类型（Intersection Type &）

交叉类型 & 用于合并多个类型，但属性冲突时不会报错，而是会生成 never 类型。

示例：交叉类型

interface Person1 {
  name: string;
}

interface Person2 {
  age: number;
}

type Staff = Person1 & Person2;

const staff: Staff = {
  name: "Alice",
  age: 25,
};

✅ 解释
	•	Staff 同时包含 name: string 和 age: number，这与 extends 类似。

4. 交叉类型的属性冲突

interface Person1 {
  name: string;
}

interface Person2 {
  name: number;
}

type Staff = Person1 & Person2;

declare const staffer: Staff;
staffer.name; // `never`

为什么 staffer.name 是 never？
	•	Staff 要求 name 同时是 string 和 number，但 name 不可能同时是 string 和 number，所以 TypeScript 推导为 never。

⸻

5. Interface extends vs. Intersection & 区别

对比点	Interface extends	Intersection &
作用	继承另一个接口，合并属性	组合多个类型，合并所有属性
同名属性	必须兼容，否则报错	不同类型时变为 never
自动合并	同名 interface 会自动合并	type 不能自动合并
适用场景	适用于继承关系，比如 Employee extends Person	适用于类型组合，比如 Person & Admin



⸻

6. 何时使用 extends vs. &

✅ 使用 extends：
	•	适用于 层级继承（如 Employee extends Person）。
	•	避免属性冲突，保证结构清晰。

✅ 使用 &（交叉类型）：
	•	适用于组合多个类型，而不是层级继承。
	•	如果两个属性冲突，它会变成 never，所以要小心。

⚠️ 避免 & 直接合并不兼容的属性

type A = { x: string };
type B = { x: number };
type C = A & B;  // x: never



⸻

7. 结论
	1.	接口（extends）用于继承，多个同名接口会自动合并，但属性类型必须兼容，否则报错。
	2.	交叉类型（&）用于类型组合，如果属性冲突，不会报错，而是变成 never，可能导致意外行为。
	3.	extends 适用于继承层级，& 适用于合并多个独立类型。
	4.	如果 & 里有冲突的类型，属性会变成 never，所以要避免直接合并不兼容的属性。

💡 推荐原则
	•	用 extends 继承已有结构。
	•	用 & 组合多个不同的类型，但要小心属性冲突。🚀
```