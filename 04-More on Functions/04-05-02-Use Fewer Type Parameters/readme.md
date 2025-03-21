```ts
function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
  return arr.filter(func);
}
 
function filter2<Type, Func extends (arg: Type) => boolean>(
  arr: Type[],
  func: Func
): Type[] {
  return arr.filter(func);
}

我们创建了一个与两个值不相关的类型参数Func 。
 这始终是一个危险信号，因为这意味着想要指定类型参数的调用者必须毫无理由地手动指定额外的类型参数。 
 Func什么也不做，只是让函数更难阅读和推理！

Rule: Always use as few type parameters as possible
规则：始终使用尽可能少的类型参数
```