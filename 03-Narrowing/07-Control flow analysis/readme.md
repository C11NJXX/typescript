```ts
到目前为止，我们已经介绍了一些 TypeScript 如何在特定分支内缩小范围的基本示例。
但除了从每个变量开始向上查找if 、 while 、条件等中的类型保护之外，还有很多事情要做。例如

function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}

padLeft从其第一个if块中返回。
TypeScript 能够分析此代码并发现，
在padding为number的情况下，其余主体部分（ return padding + input; ）无法访问。
因此，它能够从padding的类型中删除number （从string | number缩小到string ），
以完成函数的其余部分。

这种基于可达性的代码分析称为控制流分析，
TypeScript 在遇到类型保护和赋值时会使用这种流分析来缩小类型范围。
分析变量时，控制流可以反复分离和重新合并，并且可以观察到该变量在每个点都有不同的类型。

function example() {
  let x: string | number | boolean;
 
  x = Math.random() < 0.5;
 
  console.log(x);
             
let x: boolean
 
  if (Math.random() < 0.5) {
    x = "hello";
    console.log(x);
               
let x: string
  } else {
    x = 100;
    console.log(x);
               
let x: number
  }
 
  return x;
        
let x: string | number
}
```