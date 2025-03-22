```ts
这段内容讨论了 TypeScript 中的条件类型（Conditional Types），它用于根据输入类型决定输出类型。通过 条件类型，可以根据类型的不同做出选择，从而实现更加灵活的类型推断和处理。

⸻

1. 条件类型基础

条件类型的语法类似于 JavaScript 中的条件表达式：condition ? trueExpression : falseExpression。

SomeType extends OtherType ? TrueType : FalseType;

	•	条件类型根据 extends 运算符的判断，决定返回 TrueType 还是 FalseType。
	•	如果 SomeType 是 OtherType 的子类型，那么返回 TrueType，否则返回 FalseType。

示例 1：基础条件类型

interface Animal {
  live(): void;
}

interface Dog extends Animal {
  woof(): void;
}

type Example1 = Dog extends Animal ? number : string;

	•	Dog extends Animal 为 true，因此 Example1 的类型是 number。

type Example1 = number;

示例 2：条件类型为 false

type Example2 = RegExp extends Animal ? number : string;

	•	RegExp 并不是 Animal 的子类型，Example2 的类型是 string。

type Example2 = string;



⸻

2. 条件类型与泛型

条件类型与泛型结合使用时非常强大。可以根据泛型的输入类型动态决定输出类型，从而避免大量重载和冗长的代码。

示例：简化函数重载

interface IdLabel {
  id: number;
}

interface NameLabel {
  name: string;
}

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
  throw "unimplemented";
}

	•	这里定义了多个重载，分别处理 number 和 string 类型的输入，并根据输入返回不同的类型。

简化重载：使用条件类型

通过引入条件类型，我们可以简化这个函数，避免多次重载：

type NameOrId<T extends number | string> = T extends number
  ? IdLabel
  : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

解释：
	•	使用 NameOrId<T> 条件类型，根据 T 的类型（number 或 string）来决定返回 IdLabel 还是 NameLabel。
	•	这样，重载就只需要一个函数，类型推断会自动根据输入类型生成相应的输出类型。

⸻

3. 条件类型约束

条件类型中的 约束 可以帮助我们进一步限制泛型类型。例如，如果我们想从一个类型中提取 message 属性，可以使用条件类型来确保该属性存在。

示例：提取 message 属性

type MessageOf<T> = T["message"];

	•	但是，如果 T 没有 message 属性，TypeScript 会报错。

使用约束来避免错误

type MessageOf<T extends { message: unknown }> = T["message"];

interface Email {
  message: string;
}

type EmailMessageContents = MessageOf<Email>;

解释：
	•	MessageOf<T> 提取了类型 T 中的 message 属性，如果 T 确保具有 message 属性，就不会出现错误。

处理缺少 message 属性的情况

我们希望 没有 message 属性的类型默认返回 never，可以通过引入条件类型来实现：

type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

	•	如果 T 类型包含 message 属性，返回 T["message"] 的类型，否则返回 never。

示例：不同类型的结果

interface Email {
  message: string;
}

interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>;  // string
type DogMessageContents = MessageOf<Dog>;  // never



⸻

4. 示例：类型展平（Flatten）

条件类型可以用于实现一些常见的类型操作。例如，我们可以写一个 Flatten 类型，将数组类型展平为其元素类型。

示例：展平数组类型

type Flatten<T> = T extends any[] ? T[number] : T;

type Str = Flatten<string[]>;  // string
type Num = Flatten<number>;  // number

解释：
	•	Flatten<T> 通过检查类型 T 是否是一个数组（T extends any[]）来决定返回数组的元素类型（T[number]）或者返回原始类型。

⸻

5. 推断条件类型中的类型

使用 infer 关键字，我们可以在条件类型的 true 分支中推断出某些类型。通过 infer，可以让 TypeScript 自动推断类型，而不需要手动指定。

示例：推断返回类型

type GetReturnType<Type> = Type extends (...args: never[]) => infer Return
  ? Return
  : never;

type Num = GetReturnType<() => number>;  // number
type Str = GetReturnType<(x: string) => string>;  // string

解释：
	•	GetReturnType<Type> 使用 infer 从函数类型中提取返回类型。
	•	infer Return 会在 Type 是一个函数类型时，推断出该函数的返回类型。

⸻

6. 分配条件类型（Distributive Conditional Types）

当条件类型作用于 联合类型 时，它会 分布应用于联合类型的每个成员，这称为 分配条件类型。

示例：分配条件类型

type ToArray<Type> = Type extends any ? Type[] : never;

type StrArrOrNumArr = ToArray<string | number>;  // string[] | number[]

解释：
	•	ToArray<string | number> 会对 string 和 number 分别应用 Type[]，结果是 string[] | number[]。

避免分配行为

如果我们不希望条件类型分布到联合类型的每个成员，可以通过方括号来避免分配行为：

type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never;

type ArrOfStrOrNum = ToArrayNonDist<string | number>;  // (string | number)[]

	•	通过将 extends 两侧包裹在方括号中，ToArrayNonDist 会应用于整个 string | number 联合类型，而不是每个成员。

⸻

7. 总结

条件类型的核心概念：
	•	条件类型允许我们根据类型的不同来决定输出类型，类似于 condition ? trueExpression : falseExpression 的模式。
	•	与泛型结合使用时，条件类型变得非常强大，能够动态地根据类型变化来做出决策。
	•	条件类型的约束使得在条件判断中引入更具体的类型限制成为可能，增强了类型推断的灵活性。

常见应用场景：
	•	简化重载：通过条件类型，简化函数重载，减少重复代码。
	•	根据类型的不同做出决策：例如提取属性类型、展平数组等常见操作。
	•	类型推断和约束：通过 infer 关键字，可以在条件类型中进行更灵活的推断。

💡 最佳实践：使用条件类型来根据不同的类型做出决策，并通过约束和推断提升类型的灵活性和安全性。
```