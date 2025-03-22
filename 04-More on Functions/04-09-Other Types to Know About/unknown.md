```ts
unknown 类型表示任意值。这类似于 any 类型，但更安全，
因为使用 unknown 值执行任何操作都是不合法的：

function f1(a: any) {
  a.b(); // OK
}
function f2(a: unknown) {
  a.b();
'a' is of type 'unknown'.
}

这在描述函数类型时很有用，因为您可以描述接受任何值的函数，而无需在函数体中设置 any 值。

相反，你可以描述一个返回未知类型值的函数：

function safeParse(s: string): unknown {
  return JSON.parse(s);
}
 
// Need to be careful with 'obj'!
const obj = safeParse(someRandomString);
```