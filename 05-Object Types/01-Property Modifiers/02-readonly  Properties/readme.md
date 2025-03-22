```ts

对于 TypeScript，属性也可以标记为 readonly 。
虽然这不会在运行时改变任何行为，但标记为 readonly 属性在类型检查期间无法写入。

interface SomeType {
  readonly prop: string;
}
 
function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);
 
  // But we can't re-assign it.
  obj.prop = "hello";
Cannot assign to 'prop' because it is a read-only property.
}

使用 readonly 修饰符并不一定意味着值是完全不可变的 - 换句话说，其内部内容不能更改。
它只是意味着属性本身不能被重写。

interface Home {
  readonly resident: { name: string; age: number };
}
 
function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++;
}
 
function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.
  home.resident = {
Cannot assign to 'resident' because it is a read-only property.
    name: "Victor the Evictor",
    age: 42,
  };
}

管理对 readonly 含义的期望很重要。
在开发期间向 TypeScript 发出有关如何使用对象的意图很有用。
在检查两种类型是否兼容时，TypeScript 不会考虑这两种类型的属性是否为 readonly ，
因此 readonly 属性也可以通过别名进行更改。

interface Person {
  name: string;
  age: number;
}
 
interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}
 
let writablePerson: Person = {
  name: "Person McPersonface",
  age: 42,
};
 
// works
let readonlyPerson: ReadonlyPerson = writablePerson;
 
console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'

使用映射修饰符 ，您可以删除 readonly 属性。
```