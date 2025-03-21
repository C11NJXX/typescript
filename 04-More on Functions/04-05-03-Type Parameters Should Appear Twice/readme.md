```ts
有时我们会忘记某个函数可能不需要是通用的：

function greet<Str extends string>(s: Str) {
  console.log("Hello, " + s);
}
 
greet("world");

我们可以很容易地编写一个更简单的版本：

function greet(s: string) {
  console.log("Hello, " + s);
}

请记住，类型参数用于关联多个值的类型。
如果类型参数在函数签名中仅使用一次，则不关联任何内容。这包括推断的返回类型；
例如，如果Str是greet的推断返回类型的一部分，它将关联参数和返回类型，因此尽管在编写的代码中只出现一次，但它会被使用两次。

Rule: If a type parameter only appears in one location, strongly reconsider if you actually need it
规则：如果类型参数仅出现在一个位置，请强烈重新考虑是否确实需要它
```