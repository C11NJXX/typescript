```ts

很多时候，我们会发现自己正在处理可能具有属性集的对象。
在这些情况下，我们可以通过在名称末尾添加问号 ( ? ) 来将这些属性标记为可选 。

interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}
 
function paintShape(opts: PaintOptions) {
  // ...
}
 
const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });

在此示例中， xPos 和 yPos 都被视为可选。
我们可以选择提供其中任何一个，因此上述对 paintShape 的每次调用都是有效的。
可选性实际上意味着，如果设置了属性，则最好具有特定类型。

我们也可以读取这些属性 - 但是当我们在 strictNullChecks 下执行此操作时，TypeScript 会告诉我们它们可能是 undefined 。

function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos;
                   
(property) PaintOptions.xPos?: number | undefined
  let yPos = opts.yPos;
                   
(property) PaintOptions.yPos?: number | undefined
  // ...
}

在 JavaScript 中，即使该属性从未被设置过，我们仍然可以访问它 - 只不过它会给我们一个 undefined 值。
我们可以通过检查来特殊处理 undefined 。

function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;
       
let xPos: number
  let yPos = opts.yPos === undefined ? 0 : opts.yPos;
       
let yPos: number
  // ...
}

请注意，为未指定的值设置默认值的这种模式非常常见，因此 JavaScript 具有支持它的语法。

function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos);
                                  
(parameter) xPos: number
  console.log("y coordinate at", yPos);
                                  
(parameter) yPos: number
  // ...
}

这里我们对 paintShape 的参数使用了解构模式 ，并为 xPos 和 yPos 提供了默认值 。
现在 xPos 和 yPos 都肯定存在于 paintShape 的主体内，但对于 paintShape 的任何调用者来说都是可选的。

请注意，目前无法在解构模式中放置类型注释。
这是因为以下语法在 JavaScript 中已经具有不同的含义。

function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
  render(shape);
Cannot find name 'shape'. Did you mean 'Shape'?
  render(xPos);
Cannot find name 'xPos'.
}

在对象解构模式中， shape: Shape 表示“获取属性 shape 并在本地将其重新定义为名为 Shape 的变量”。同样 xPos: number 创建一个名为 number 的变量，其值基于参数的 xPos 。
```