```ts
let obj: any = { x: 0 };
// None of the following lines of code will throw compiler errors.
// Using `any` disables all further type checking, and it is assumed
// you know the environment better than TypeScript.
obj.foo();
obj();
obj.bar = 100;
obj = "hello";
const n: number = obj;
```

```
When you don’t specify a type, and TypeScript can’t infer it from context, the compiler will typically default to any.
当你未指定类型且 TypeScript 无法从上下文中推断类型时，编译器通常会默认为any 。

You usually want to avoid this, though, because any isn’t type-checked. Use the compiler flag noImplicitAny to flag any implicit any as an error.
不过，您通常希望避免这种情况，因为any未经过类型检查。使用编译器标志noImplicitAny将任何隐式any标记为错误。
```