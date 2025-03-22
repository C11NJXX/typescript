```ts
有时您事先并不知道类型的所有属性的名称，但您知道值的形状。

在这些情况下，您可以使用索引签名来描述可能值的类型，例如：

interface StringArray {
  [index: number]: string;
}
 
const myArray: StringArray = getStringArray();
const secondItem = myArray[1];
          
const secondItem: string

上面，我们有一个 StringArray 接口，它有一个索引签名。
这个索引签名表明，当用 number 索引 StringArray 时，它将返回一个 string 。

索引签名属性仅允许某些类型： string 、 number 、 symbol 、模板字符串模式以及仅由这些组成的联合类型。

可以支持多种类型的索引器...

虽然字符串索引签名是描述“字典”模式的有效方法，
但它们也强制所有属性都与其返回类型匹配。
这是因为字符串索引声明 obj.property 也可用作 obj["property"] 。
在以下示例中， name 的类型与字符串索引的类型不匹配，类型检查器给出错误：

interface NumberDictionary {
  [index: string]: number;
 
  length: number; // ok
  name: string;
Property 'name' of type 'string' is not assignable to 'string' index type 'number'.
}

但是，如果索引签名是属性类型的联合，则可以接受不同类型的属性：

interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}

最后，您可以将索引签名设为 readonly 以防止分配给其索引：

interface ReadonlyStringArray {
  readonly [index: number]: string;
}
 
let myArray: ReadonlyStringArray = getReadOnlyStringArray();
myArray[2] = "Mallory";
Index signature in type 'ReadonlyStringArray' only permits reading.

您无法设置 myArray[2] 因为索引签名是 readonly 。
```