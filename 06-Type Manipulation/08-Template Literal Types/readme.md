```ts
这段内容介绍了 TypeScript 中的模板字面量类型（Template Literal Types），以及它如何通过字符串操作和推断，提供了强大的类型推导能力。我们还了解了内在字符串操作类型，这些类型为字符串操作提供了编译器内置的功能。

⸻

1. 模板字面量类型（Template Literal Types）

模板字面量类型是基于字符串字面量类型构建的，它们允许通过插值将多个字符串联合起来，形成新的字符串类型。它们的语法与 JavaScript 中的模板字面量字符串相同，但是用于类型位置。

示例：基本模板字面量类型

type World = "world";

type Greeting = `hello ${World}`;

解释：
	•	Greeting 是一个字符串字面量类型，值为 "hello world"。

⸻

2. 使用联合类型与模板字面量

当在模板字面量类型中使用联合类型时，它会根据每个联合成员的不同组合生成新的字符串类型。

示例：使用联合类型

type EmailLocaleIDs = "welcome_email" | "email_heading";
type FooterLocaleIDs = "footer_title" | "footer_sendoff";

type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`;

解释：
	•	AllLocaleIDs 是一个联合类型，它包含了所有可能的字符串字面量："welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"。

⸻

3. 对联合类型进行交叉组合

当联合类型应用于模板字面量的插值位置时，会进行 交叉组合，即将每个成员与其他成员进行组合，形成所有可能的结果。

示例：多重联合类型交叉

type Lang = "en" | "ja" | "pt";

type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`;

解释：
	•	LocaleMessageIDs 生成一个包含所有语言和所有 AllLocaleIDs 组合的字符串类型：

type LocaleMessageIDs = 
  "en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id" |
  "ja_welcome_email_id" | "ja_email_heading_id" | "ja_footer_title_id" | "ja_footer_sendoff_id" |
  "pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id";



⸻

4. 模板字面量类型与函数类型结合使用

模板字面量类型与函数结合使用时非常有用，可以根据对象的属性生成事件名称并确保类型一致。

示例：创建一个“被监视对象”

type PropEventSource<Type> = {
  on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
};

解释：
	•	on 函数的 eventName 参数要求传入一个 "属性名称Changed" 格式的字符串，Type 为对象类型。
	•	这样，只有对象中存在的属性可以触发事件，从而避免了错误的事件名称。

declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

	•	通过 makeWatchedObject 创建的对象将包含 on 方法，并且事件名称必须是现有属性名加上 "Changed" 后缀。

示例：使用 on 监听属性变化

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});

person.on("firstNameChanged", (newValue) => {
  console.log(`firstName was changed to ${newValue}!`);
});

解释：
	•	使用 on("firstNameChanged", callback) 来监听 firstName 属性的变化。
	•	TypeScript 会确保 newValue 的类型与属性的类型一致。

⸻

5. 推断与模板字面量

模板字面量类型在推断时，能够根据事件名称推断出属性的类型，从而确保回调函数的参数类型与属性的类型一致。

示例：推断回调参数的类型

type PropEventSource<Type> = {
  on<Key extends string & keyof Type>(eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void): void;
};

const person = makeWatchedObject({
  firstName: "Saoirse",
  lastName: "Ronan",
  age: 26
});

person.on("firstNameChanged", newName => {
  console.log(`new name is ${newName.toUpperCase()}`);
});

person.on("ageChanged", newAge => {
  if (newAge < 0) {
    console.warn("warning! negative age");
  }
});

解释：
	•	当调用 on("firstNameChanged") 时，Key 被推断为 firstName，newName 的类型是 string。
	•	当调用 on("ageChanged") 时，Key 被推断为 age，newAge 的类型是 number。

⸻

6. 内在字符串操作类型

TypeScript 提供了一些内建的字符串操作类型，用于进行字符串操作，如转换为大写、小写、首字母大写等。

示例：大写操作

type Greeting = "Hello, world";
type ShoutyGreeting = Uppercase<Greeting>;

解释：
	•	Uppercase<Greeting> 将 "Hello, world" 转换为 "HELLO, WORLD"。

type ShoutyGreeting = "HELLO, WORLD";

示例：小写操作

type Greeting = "Hello, world";
type QuietGreeting = Lowercase<Greeting>;

解释：
	•	Lowercase<Greeting> 将 "Hello, world" 转换为 "hello, world"。

type QuietGreeting = "hello, world";

示例：首字母大写

type LowercaseGreeting = "hello, world";
type Greeting = Capitalize<LowercaseGreeting>;

解释：
	•	Capitalize<LowercaseGreeting> 将 "hello, world" 转换为 "Hello, world"。

type Greeting = "Hello, world";

示例：首字母小写

type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;

解释：
	•	Uncapitalize<UppercaseGreeting> 将 "HELLO WORLD" 转换为 "hELLO WORLD"。

type UncomfortableGreeting = "hELLO WORLD";



⸻

7. 总结

模板字面量类型：
	•	模板字面量类型 允许通过插值生成新的字符串类型，并支持字符串的动态生成。
	•	与 联合类型 结合使用时，可以生成多个字符串类型的组合。
	•	与 函数 结合时，可以确保根据对象属性生成的事件名称类型一致。

内在字符串操作类型：
	•	TypeScript 提供了 Uppercase、Lowercase、Capitalize 和 Uncapitalize 类型，便于对字符串进行转换操作。
	•	这些内建类型使用了 JavaScript 字符串函数进行优化，以提高性能。

💡 最佳实践：模板字面量类型在构建动态类型和事件系统时非常有用，结合 推断 和 内在字符串操作类型，可以大大提高类型的灵活性和准确性。
```