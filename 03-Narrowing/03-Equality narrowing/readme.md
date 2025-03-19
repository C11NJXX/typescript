```ts
TypeScript 还使用switch语句和相等性检查（如=== 、 !== 、 ==和!=来缩小类型。例如：

function example(x: string | number, y: string | boolean) {
  if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
    x.toUpperCase();
          
(method) String.toUpperCase(): string
    y.toLowerCase();
          
(method) String.toLowerCase(): string
  } else {
    console.log(x);
               
(parameter) x: string | number
    console.log(y);
               
(parameter) y: string | boolean
  }
}


当我们在上面的例子中检查x和y是否相等时，TypeScript 知道它们的类型也必须相等。
由于string是x和y可以采用的唯一通用类型，
因此 TypeScript 知道x和y在第一个分支中必须是string 。

检查特定文字值（而不是变量）也有效。
在关于真实性缩小的部分中，我们编写了一个printAll函数，该函数容易出错，因为它意外地无法正确处理空字符串。相反，我们可以进行特定检查以阻止null ，而 TypeScript 仍然会正确地从strs类型中删除null 。

function printAll(strs: string | string[] | null) {
  if (strs !== null) {
    if (typeof strs === "object") {
      for (const s of strs) {
                       
(parameter) strs: string[]
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
                   
(parameter) strs: string
    }
  }
}

JavaScript 的==和!=等式检查更宽松，也得到了正确的范围缩小。
如果你不熟悉，检查某个东西是否== null实际上不仅会检查它是否是null值，还会检查它是否可能是undefined 。同样适用于== undefined ：它检查一个值是null还是undefined 。

interface Container {
  value: number | null | undefined;
}
 
function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value != null) {
    console.log(container.value);
                           
(property) Container.value: number
 
    // Now we can safely multiply 'container.value'.
    container.value *= factor;
  }
}
```