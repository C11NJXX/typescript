```ts

正如我们所见，JavaScript 支持typeof运算符，
它可以提供有关运行时值类型的非常基本的信息。
TypeScript 期望它返回一组特定的字符串：

"string"
"number"
"bigint"
"boolean"
"symbol"
"undefined"
"object"
"function"

就像我们在padLeft中看到的一样，
这个运算符在许多 JavaScript 库中经常出现，
并且 TypeScript 可以理解它以缩小不同分支中的类型。

在 TypeScript 中，检查typeof返回的值是一种类型保护。
由于 TypeScript 对typeof如何对不同值进行操作进行了编码，
因此它知道 JavaScript 中的一些怪癖。
例如，请注意，在上面的列表中， typeof不会返回字符串null 。查看以下示例：

function printAll(strs: string | string[] | null) {
  if (typeof strs === "object") {
    for (const s of strs) {
'strs' is possibly 'null'.
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  } else {
    // do nothing
  }
}


在printAll函数中，我们尝试检查strs是否为对象，
以查看它是否为数组类型（现在可能是强调数组在 JavaScript 中是对象类型的好时机）。
但事实证明，在 JavaScript 中， typeof null实际上是"object" ！这是历史上不幸的事故之一。

有足够经验的用户可能不会感到惊讶，但并不是每个人都在 JavaScript 中遇到过这种情况；
幸运的是，TypeScript 让我们知道strs只是缩小到string[] | null而不仅仅是string[] 。

这可能是一个很好的过渡，我们将称之为“真实性”检查。
```