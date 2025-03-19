```
函数是 JavaScript 中传递数据的主要方式。TypeScript 允许您指定函数的输入值和输出值的类型。
```

```ts
参数类型注解

声明函数时，可以在每个参数后添加类型注释，以声明该函数接受的参数类型。参数类型注释位于参数名称之后：


// Parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}

当参数具有类型注释时，将检查该函数的参数：

// Would be a runtime error if executed!
greet(42);
Argument of type 'number' is not assignable to parameter of type 'string'.

即使你的参数上没有类型注释，TypeScript 仍会检查你是否传递了正确数量的参数。
```

```ts
返回类型注解

您还可以添加返回类型注释。返回类型注释出现在参数列表之后：

function getFavoriteNumber(): number {
  return 26;
}

与变量类型注释非常相似，您通常不需要返回类型注释，
因为 TypeScript 会根据函数的返回语句推断其return类型。
上例中的类型注释不会改变任何内容。
某些代码库会出于文档目的、防止意外更改或个人偏好而明确指定返回类型。


返回 Promise 的函数

如果你想要注释返回 Promise 的函数的返回类型，你应该使用Promise类型：

async function getFavoriteNumber(): Promise<number> {
  return 26;
}

```

```ts
Anonymous Functions
  匿名函数

匿名函数与函数声明略有不同。
当函数出现在 TypeScript 可以确定如何调用它的位置时，该函数的参数将自动被赋予类型。

Here’s an example:

const names = ["Alice", "Bob", "Eve"];
 
// Contextual typing for function - parameter s inferred to have type string
names.forEach(function (s) {
  console.log(s.toUpperCase());
});
 
// Contextual typing also applies to arrow functions
names.forEach((s) => {
  console.log(s.toUpperCase());
});


即使参数s没有类型注释，TypeScript 也会使用forEach函数的类型以及数组的推断类型来确定s将具有的类型。


该过程称为上下文类型化(contextual typing)，因为函数所处的上下文决定了它应该具有什么类型。


与推理规则类似，您不需要明确了解这种情况是如何发生的，
但了解这种情况确实会发生可以帮助您注意到何时不需要类型注释。

```