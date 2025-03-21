```ts
JavaScript 有一个运算符，用于检查一个值是否是另一个值的“实例”。
更具体地说，在 JavaScript 中， x instanceof Foo检查x的原型链是否包含Foo.prototype 。
虽然我们不会在这里深入探讨，当我们进入类时你会看到更多，
但它们对于可以用new构造的大多数值仍然有用。正如你可能已经猜到的那样，
 instanceof也是一个类型保护，TypeScript 在由instanceof保护的分支中缩小了范围。

function logValue(x: Date | string) {
  if (x instanceof Date) {
    console.log(x.toUTCString());
               
(parameter) x: Date
  } else {
    console.log(x.toUpperCase());
               
(parameter) x: string
  }
}
```