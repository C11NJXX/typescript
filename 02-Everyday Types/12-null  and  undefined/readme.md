```ts

JavaScript 有两个原始值用于表示缺失或未初始化的值： null和undefined 。

TypeScript 有两种同名的对应类型。
这些类型的行为取决于您是否启用了strictNullChecks选项。

strictNullChecks
 off


关闭strictNullChecks后，
可能为null或undefined值仍可正常访问，
并且null和undefined值可分配给任何类型的属性。
这与没有 null 检查的语言（例如 C#、Java）的行为方式类似。
缺乏对这些值的检查往往是错误的主要来源；
如果在代码库中可行，我们始终建议人们打开strictNullChecks 。

strictNullChecks
 on

使用strictNullChecks时，
当值为null或undefined时，您需要在对该值使用方法或属性之前测试这些值。
就像在使用可选属性之前检查undefined一样，
我们可以使用缩小范围来检查可能为null的值：

function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}

  非空断言运算符（后缀）

TypeScript 还有一种特殊语法，
无需进行任何显式检查即可从类型中删除null和undefined 。
在任何表达式后写入!实际上是类型断言，
即值不为null或undefined ：

function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}


就像其他类型断言一样，这不会改变代码的运行时行为，因此仅当您知道值不能为null或undefined时才使用 ! 非常重要!
```