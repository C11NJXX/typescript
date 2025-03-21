```ts
正如我们前面提到的，当我们分配给任何变量时，TypeScript 都会查看赋值的右侧并适当缩小左侧。

let x = Math.random() < 0.5 ? 10 : "hello world!";
   
let x: string | number
x = 1;
 
console.log(x);
           
let x: number
x = "goodbye!";
 
console.log(x);
           
let x: string

请注意，每个赋​​值都是有效的。即使在第一次赋值后x的观察类型变为number ，我们仍然能够将string分配给x 。这是因为x的声明类型（ x开头的类型）是string | number ，并且始终根据声明类型检查可赋值性。

如果我们将boolean分配给x ，我们会看到错误，因为它不是声明类型的一部分。

let x = Math.random() < 0.5 ? 10 : "hello world!";
   
let x: string | number
x = 1;
 
console.log(x);
           
let x: number
x = true;
Type 'boolean' is not assignable to type 'string | number'.
 
console.log(x);
           
let x: string | number
```