```ts
函数的 void 返回类型可能会产生一些不寻常但预期的行为。

返回类型为 void 的上下文类型化 不会 强制函数 不 返回任何内容。
换句话说，返回类型为 void 的上下文函数类型 ( type voidFunc = () => void ) 
在实现时可以返回任何其他值，但会被忽略。

因此，类型 () => void 的以下实现是有效的：

type voidFunc = () => void;
 
const f1: voidFunc = () => {
  return true;
};
 
const f2: voidFunc = () => true;
 
const f3: voidFunc = function () {
  return true;
};

当其中一个函数的返回值被赋给另一个变量时，它将保留 void 类型：

const v1 = f1();
 
const v2 = f2();
 
const v3 = f3();

存在这种行为，因此即使 Array.prototype.push 返回一个数字，
并且 Array.prototype.forEach 方法需要一个返回类型为 void 的函数，
下面的代码仍然是有效的。

const src = [1, 2, 3];
const dst = [0];
 
src.forEach((el) => dst.push(el));

还有一种特殊情况需要注意，当文字函数定义具有 void 返回类型时，该函数不能返回任何内容。

function f2(): void {
  // @ts-expect-error
  return true;
}
 
const f3 = function (): void {
  // @ts-expect-error
  return true;
};
```