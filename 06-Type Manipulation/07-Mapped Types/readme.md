```ts
这段内容介绍了 TypeScript 中的映射类型（Mapped Types），以及如何使用它们来根据现有类型生成新类型。通过映射类型，我们可以进行 类型修改、键重映射、条件类型的结合使用 等复杂操作，从而提高类型的复用性和灵活性。

⸻

1. 映射类型基础

映射类型通过索引签名的语法来创建新类型。它允许你遍历一个类型的所有属性，并根据需要生成一个新类型。

示例：基础映射类型

type OnlyBoolsAndHorses = {
  [key: string]: boolean | Horse;
};

const conforms: OnlyBoolsAndHorses = {
  del: true,
  rodney: false,
};

解释：
	•	这里，OnlyBoolsAndHorses 是一个 映射类型，它接受一个字符串键，值可以是 boolean 或 Horse 类型。

⸻

2. 使用 keyof 创建映射类型

映射类型通常与 keyof 运算符一起使用，以便动态地根据对象的属性创建新类型。

示例：使用 keyof 创建映射类型

type OptionsFlags<Type> = {
  [Property in keyof Type]: boolean;
};

type Features = {
  darkMode: () => void;
  newUserProfile: () => void;
};

type FeatureOptions = OptionsFlags<Features>;

解释：
	•	OptionsFlags 映射类型将 Features 类型的所有属性值转化为 boolean 类型。

type FeatureOptions = {
  darkMode: boolean;
  newUserProfile: boolean;
};



⸻

3. 映射修饰符

映射修饰符可以在映射过程中修改类型的 可变性（readonly）和 可选性（?）。你可以使用 - 或 + 前缀来删除或添加这些修饰符。

示例：去除 readonly 属性

type CreateMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
};

type UnlockedAccount = CreateMutable<LockedAccount>;

解释：
	•	CreateMutable 去除了 LockedAccount 类型中所有属性的 readonly 修饰符。

type UnlockedAccount = {
  id: string;
  name: string;
};

示例：去除可选属性

type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property];
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type User = Concrete<MaybeUser>;

解释：
	•	Concrete 去除了 MaybeUser 类型中所有属性的 ?，使其变为必选属性。

type User = {
  id: string;
  name: string;
  age: number;
};



⸻

4. 键重映射（Key Remapping）

在 TypeScript 4.1 及以后版本中，可以使用 as 关键字在映射类型中进行 键重映射。这允许我们 重命名属性，从而创建具有不同键名的类型。

示例：键重映射

type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property];
};

interface Person {
  name: string;
  age: number;
  location: string;
}

type LazyPerson = Getters<Person>;

解释：
	•	Getters 映射类型将 Person 类型的每个属性前添加 get，并将属性名首字母大写，生成新键名。

type LazyPerson = {
  getName: () => string;
  getAge: () => number;
  getLocation: () => string;
};



⸻

5. 通过条件类型过滤键

你可以通过 条件类型 和 Exclude 等工具来 过滤掉某些键，从而移除类型中的某些属性。

示例：移除某个属性

type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property];
};

interface Circle {
  kind: "circle";
  radius: number;
}

type KindlessCircle = RemoveKindField<Circle>;

解释：
	•	RemoveKindField 使用 Exclude 来移除 kind 属性。

type KindlessCircle = {
  radius: number;
};



⸻

6. 映射任意联合类型

映射类型不仅限于 string | number | symbol 联合类型，还可以对任何类型的联合进行映射。

示例：处理联合类型

type EventConfig<Events extends { kind: string }> = {
  [E in Events as E["kind"]]: (event: E) => void;
};

type SquareEvent = { kind: "square", x: number, y: number };
type CircleEvent = { kind: "circle", radius: number };

type Config = EventConfig<SquareEvent | CircleEvent>;

解释：
	•	EventConfig 将 SquareEvent 和 CircleEvent 联合类型中的 kind 属性映射为 square 和 circle 字符串，生成对应的处理函数。

type Config = {
  square: (event: SquareEvent) => void;
  circle: (event: CircleEvent) => void;
};



⸻

7. 进一步探索

示例：使用条件类型操作对象属性

通过 条件类型，可以根据对象的某些属性值（例如 pii 设置为 true）做出选择。

type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
};

type DBFields = {
  id: { format: "incrementing" };
  name: { type: string; pii: true };
};

type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;

解释：
	•	ExtractPII 根据 pii: true 的属性为 true，其他为 false，生成 DBFields 类型的一个新类型。

type ObjectsNeedingGDPRDeletion = {
  id: false;
  name: true;
};



⸻

8. 总结

映射类型的主要特性：
	•	遍历对象属性：根据已有类型的属性生成新类型。
	•	条件类型结合映射类型：根据属性的值或类型来决定生成的类型。
	•	键重映射：使用 as 关键字对属性进行重命名，创造新的键名。
	•	映射任意联合类型：不仅支持 string | number | symbol，也支持其他类型的联合类型。

常见应用场景：
	•	修改类型属性：如移除 readonly 或 ? 修饰符，或者将属性的类型转化为布尔值。
	•	属性重命名：使用 as 来生成新的属性名。
	•	过滤和选择属性：根据条件类型过滤或选取特定的属性。

💡 最佳实践：映射类型和条件类型非常强大，可以帮助你构建灵活、复用性强的类型系统。合理使用这些工具，可以避免冗余代码，并且使你的类型系统更加精确和可维护。
```