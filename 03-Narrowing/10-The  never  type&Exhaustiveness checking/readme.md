```ts
缩小范围时，您可以将联合的选项减少到删除所有可能性且不剩任何内容的程度。
在这些情况下，TypeScript 将使用never类型来表示不应存在的状态。

never类型可分配给每个类型；
但是，没有类型可分配给never （ never本身除外）。
这意味着您可以使用缩小范围并依靠never出现来在switch语句中进行详尽检查。

例如，在getArea函数中添加一个default ，尝试将形状分配给never ，在处理完所有可能的情况后不会引发错误。

type Shape = Circle | Square;
 
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
      return _exhaustiveCheck;
  }
}

向Shape联合添加新成员将导致 TypeScript 错误：

interface Triangle {
  kind: "triangle";
  sideLength: number;
}
 
type Shape = Circle | Square | Triangle;
 
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape;
Type 'Triangle' is not assignable to type 'never'.
      return _exhaustiveCheck;
  }
}
```