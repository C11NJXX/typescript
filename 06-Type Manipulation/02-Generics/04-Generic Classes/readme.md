```ts
这段内容主要介绍了 TypeScript 中的泛型类（Generic Classes），包括 如何定义和使用泛型类，以及 泛型类的静态成员不能使用类型参数的限制。让我们详细解析。

⸻

1. 什么是泛型类？

泛型类 是 可以根据不同类型进行实例化的类，类似于泛型接口和泛型函数。它在 类名后面的尖括号 <T> 指定类型参数，使得类的属性和方法都能使用这个泛型类型。

基本示例

class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

	•	GenericNumber<NumType> 是一个 泛型类，其中 NumType 是泛型参数。
	•	zeroValue 和 add 方法都会使用 NumType 作为类型。

⸻

2. 泛型类的实例

在创建类的实例时，我们需要指定具体的类型：

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

console.log(myGenericNumber.add(5, 10)); // 15

✅ 解释
	•	new GenericNumber<number>() 指定 NumType = number，所以 zeroValue 和 add 只能使用 number 类型。
	•	add 方法的参数 x 和 y 也必须是 number，返回值也是 number。

⸻

3. 泛型类的多种类型支持

泛型类并不局限于 number 类型，它可以用于 string 或其他复杂对象：

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, "test")); // "test"

✅ 解释
	•	这里 NumType = string，所以 zeroValue 是 string，add 方法也处理 string 类型。
	•	stringNumeric.add("", "test") 返回 "test"。

💡 总结
	•	泛型类的属性和方法会保持相同的类型。
	•	我们可以在实例化时指定不同的类型（number、string 等），从而使类更灵活。

⸻

4. 泛型类的静态成员

在 TypeScript 中，类有两种类型：
	1.	实例类型（Instance Side） → 适用于 this，即 new 关键字创建的实例。
	2.	静态类型（Static Side） → 适用于 className.staticMethod() 这种静态调用。

泛型类 只适用于实例成员，不能用于静态成员：

class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;

  // ❌ 报错：静态成员不能使用泛型类型
  static defaultValue: T;
}

💡 错误原因
	•	静态成员 属于类本身，而 泛型参数 T 只对实例有效，无法被静态成员访问。

正确的做法

如果你想让静态成员支持不同的类型，你可以使用 非泛型静态属性：

class GenericNumber<T> {
  zeroValue: T;
  add: (x: T, y: T) => T;

  // ✅ 静态属性使用非泛型类型
  static defaultValue: number = 100;
}

这样 defaultValue 不会依赖 T，可以独立存在。

⸻

5. 泛型类的应用

泛型类在许多场景下都非常有用，例如：

（1）通用的数据存储类

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data = this.data.filter(i => i !== item);
  }

  getItems() {
    return [...this.data];
  }
}

// 创建一个 `string` 类型的存储类
const textStorage = new DataStorage<string>();
textStorage.addItem("Apple");
textStorage.addItem("Banana");
console.log(textStorage.getItems()); // ["Apple", "Banana"]

// 创建一个 `number` 类型的存储类
const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
numberStorage.addItem(2);
console.log(numberStorage.getItems()); // [1, 2]

✅ 优势
	•	这个类适用于存储任何类型（T），而不只是 string 或 number。
	•	避免代码重复，可以使用 相同的逻辑 处理不同的数据类型。

⸻

（2）泛型栈（Stack）

class Stack<T> {
  private elements: T[] = [];

  push(element: T): void {
    this.elements.push(element);
  }

  pop(): T | undefined {
    return this.elements.pop();
  }
}

// 创建 `number` 类型的栈
const numberStack = new Stack<number>();
numberStack.push(10);
numberStack.push(20);
console.log(numberStack.pop()); // 20
console.log(numberStack.pop()); // 10

// 创建 `string` 类型的栈
const stringStack = new Stack<string>();
stringStack.push("Hello");
stringStack.push("World");
console.log(stringStack.pop()); // "World"

✅ 优势
	•	同一个 Stack 类可以适用于不同的类型，不需要为 number 和 string 创建单独的 Stack 类。
	•	确保类型安全，不能错误地在 number 类型的栈中放入 string。

⸻

6. 总结

✅ 泛型类的定义

class GenericClass<T> {
  property: T;
  method(param: T): T { return param; }
}

	•	T 是泛型参数，可以在类的属性和方法中使用。
	•	在实例化时，我们可以指定具体的类型。

✅ 泛型类的使用

let instance = new GenericClass<string>();
instance.property = "Hello";
console.log(instance.method("World")); // "World"

	•	T 在实例化时被替换为 string，保证了类型安全。

✅ 静态成员不能使用泛型

class Test<T> {
  static value: T; // ❌ 错误
}

	•	静态成员无法访问泛型参数 T，因为静态成员属于类，而 T 只适用于实例。

✅ 泛型类的应用
	1.	数据存储类（如 DataStorage<T>）
	2.	栈结构（如 Stack<T>）
	3.	数学计算类（如 GenericNumber<T>）

💡 最佳实践
	•	使用泛型类时，应确保类型参数 T 一致，这样可以保持类型安全。
	•	避免在静态成员中使用泛型，可以用非泛型的静态属性代替。

⸻

🚀 TypeScript 的泛型类提供了更好的代码复用性和类型安全，适用于存储、计算、数据处理等多种场景！
```