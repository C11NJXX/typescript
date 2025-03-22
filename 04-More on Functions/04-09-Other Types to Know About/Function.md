```ts
全局类型 Function 描述了 JavaScript 中所有函数值上存在的诸如 bind 、 call 、 apply 等属性。
它还具有特殊属性，即 Function 类型的值始终可以被调用；这些调用返回 any ：

function doSomething(f: Function) {
  return f(1, 2, 3);
}

这是一个无类型函数调用 ，由于 any 返回类型都不安全，通常最好避免。

如果您需要接受任意函数但不打算调用它，则类型 () => void 通常更安全。
```