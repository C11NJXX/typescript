```ts
有些函数从不返回值：

function fail(msg: string): never {
  throw new Error(msg);
}

never 类型表示永远不会被观察到的值。
在返回类型中，这意味着函数抛出异常或终止程序的执行。

当 TypeScript 确定联合中没有任何剩余内容时，也会出现 never 情况。

function fn(x: string | number) {
  if (typeof x === "string") {
    // do something
  } else if (typeof x === "number") {
    // do something else
  } else {
    x; // has type 'never'!
  }
}
```