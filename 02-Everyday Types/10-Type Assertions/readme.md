```ts
有时您会获得 TypeScript 无法了解的值类型的信息。

例如，如果您使用document.getElementById 
TypeScript 只知道这将返回某种HTMLElement
但您可能知道您的页面将始终具有给定 ID 的HTMLCanvasElement 。

在这种情况下，您可以使用类型断言来指定更具体的类型：

const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

与类型注释一样，类型断言会被编译器删除，并且不会影响代码的运行时行为。

您还可以使用尖括号语法（除非代码位于.tsx文件中），
其等效性如下：

const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");

提醒：由于类型断言在编译时被删除，因此不存在与类型断言相关的运行时检查。
如果类型断言错误，则不会生成异常或null 。

TypeScript 仅允许将类型断言转换为更具体或更不具体的类型版本。
此规则可防止“不可能”的强制转换，例如：

const x = "hello" as number;
//Conversion of type 'string' to type 'number' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.

有时此规则可能过于保守，并且将不允许可能有效的更复杂的强制转换。
如果发生这种情况，您可以使用两个断言，
首先是any （或unknown ，我们将在后面介绍），然后是所需类型：

const a = expr as any as T;
```