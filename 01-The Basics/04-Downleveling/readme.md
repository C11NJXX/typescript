在03中编译的js文件，没有使用template string

默认情况下，TypeScript 以 ES5 为目标，这是 ECMAScript 的一个非常老的版本。

我们可以使用target选项选择更新一些的版本。

使用--target es2015运行会将 TypeScript 更改为以 ECMAScript 2015 为目标，

这意味着代码应该能够在支持 ECMAScript 2015 的任何地方运行。

因此，运行tsc --target es2015 hello.ts会给我们以下输出：

```js
function greet(person, date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet("Maddison", new Date());

```

![alt text](image.png)