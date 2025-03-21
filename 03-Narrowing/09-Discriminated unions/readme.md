```ts
到目前为止，我们看到的大多数示例都集中在使用简单类型（如string 、 boolean和number来缩小单个变量的范围。虽然这很常见，但在 JavaScript 中，大多数时候我们都会处理稍微复杂一些的结构。

为了激发一些灵感，我们假设我们正在尝试编码圆形和正方形等形状。圆形跟踪其半径，正方形跟踪其边长。我们将使用一个名为kind的字段来判断我们正在处理哪种形状。这是定义Shape的首次尝试。

interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

请注意，我们使用了字符串文字类型的并集： "circle"和"square"来告诉我们是否应该将形状分别视为圆形或正方形。通过使用"circle" | "square"而不是string ，我们可以避免拼写错误问题。

function handleShape(shape: Shape) {
  // oops!
  if (shape.kind === "rect") {
This comparison appears to be unintentional because the types '"circle" | "square"' and '"rect"' have no overlap.
    // ...
  }
}

我们可以编写一个getArea函数，根据处理的是圆形还是正方形来应用正确的逻辑。我们首先尝试处理圆形。

function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2;
'shape.radius' is possibly 'undefined'.
}

在strictNullChecks下，这会给我们一个错误 - 这是适当的，因为radius可能未定义。
但如果我们对kind属性执行适当的检查会怎样？

function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
'shape.radius' is possibly 'undefined'.
  }
}

嗯，TypeScript 仍然不知道该怎么做。
我们已经到了这样的地步，即我们对值的了解比类型检查器还要多。
我们可以尝试使用非空断言（ shape.radius后面的! ）来表示radius肯定存在。

function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius! ** 2;
  }
}

但这感觉并不理想。我们不得不用那些非空断言（ ! ）向类型检查器大喊大叫，以说服它shape.radius已定义，
但如果我们开始移动代码，这些断言很容易出错。
此外，在strictNullChecks之外，我们无论如何都能意外访问任何这些字段
（因为可选属性在读取时被假定始终存在）。
我们绝对可以做得更好。

Shape的这种编码存在一个问题，即类型检查器无法根据kind属性判断radius或sideLength是否存在。
我们需要将我们所知道的信息传达给类型检查器。
考虑到这一点，让我们再来定义一下Shape 。

interface Circle {
  kind: "circle";
  radius: number;
}
 
interface Square {
  kind: "square";
  sideLength: number;
}
 
type Shape = Circle | Square;

在这里，我们正确地将Shape分成两种类型，并为kind属性指定不同的值，
但radius和sideLength在各自的类型中被声明为必需属性。

让我们看看当我们尝试访问Shape的radius会发生什么。

function getArea(shape: Shape) {
  return Math.PI * shape.radius ** 2;
Property 'radius' does not exist on type 'Shape'.
  Property 'radius' does not exist on type 'Square'.
}

就像我们第一次定义Shape一样，这仍然是一个错误。
当radius是可选的时，我们会收到错误（启用了strictNullChecks ），
因为 TypeScript 无法判断该属性是否存在。
现在Shape是一个联合，TypeScript 告诉我们shape可能是一个Square ，而Square上没有定义radius ！
这两种解释都是正确的，但无论strictNullChecks如何配置，只有Shape的联合编码才会导致错误。

但是如果我们尝试再次检查kind属性会怎么样？

function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius ** 2;
                      
(parameter) shape: Circle
  }
}

这样就消除了错误！
当联合中的每个类型都包含具有文字类型的公共属性时，TypeScript 会将其视为可区分联合，并可以缩小联合的成员范围。

在这种情况下， kind是公共属性（这被视为Shape的判别属性）。
检查kind属性是否为"circle"会删除Shape中没有类型为"circle"的kind属性的所有类型。
这将shape缩小到Circle类型。

同样的检查也适用于switch语句。现在我们可以尝试编写完整的getArea ，而无需任何烦人的!非空断言。

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
                        
(parameter) shape: Circle
    case "square":
      return shape.sideLength ** 2;
              
(parameter) shape: Square
  }

这里最重要的是Shape的编码。
向 TypeScript 传达正确的信息（即Circle和Square实际上是具有特定kind字段的两种不同类型）至关重要。
这样做让我们可以编写类型安全的 TypeScript 代码，这些代码看起来与我们原本编写的 JavaScript 没什么不同。从那里开始，类型系统能够做“正确”的事情，并找出switch语句每个分支中的类型。

另外，试着玩弄上面的示例并删除一些 return 关键字。
你会发现类型检查可以帮助避免在意外落入switch语句中的不同子句时出现错误。

可区分联合的用处不仅仅在于圆形和​​正方形。
它们还适用于表示 JavaScript 中的任何类型的消息传递方案，例如通过网络发送消息（客户端/服务器通信），或在状态管理框架中编码突变。
```