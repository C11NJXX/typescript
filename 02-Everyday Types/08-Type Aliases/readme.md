在 TypeScript 中，**类型别名（Type Alias）** 只是一个别名，本质上它和原类型是完全相同的。你不能通过别名让 TypeScript 认为它是一个“新的”或“不同的”类型。  

---

### ❶ **类型别名只是一个“名字”，不会改变类型的本质**
看看这个例子：
```ts
type UserInputSanitizedString = string; // 给 string 取了个新名字

function sanitizeInput(str: string): UserInputSanitizedString {
  return sanitize(str);
}

let userInput = sanitizeInput(getInput());

// 这里虽然 userInput 的类型是 UserInputSanitizedString，但它仍然可以被赋值为普通的 string
userInput = "new input"; // ✅ TypeScript 允许
```
**为什么 TypeScript 允许 `userInput = "new input";`？**  
因为 `UserInputSanitizedString` **只是** `string` 的别名，**它仍然是 `string`**，所以你可以随意把 `string` 赋值给它。

---

### ❷ **你不能用类型别名制造“不同的类型”**
如果你希望 `UserInputSanitizedString` 和 `string` 是两个不同的类型，让 TypeScript **不允许**你随意赋值 `string`，**类型别名是做不到的**。  
例如，下面的代码 TypeScript 仍然认为 `UserInputSanitizedString` 和 `string` 是一样的：
```ts
type UserInputSanitizedString = string;
type RawInputString = string;

let sanitized: UserInputSanitizedString = "safe";
let raw: RawInputString = "unsafe";

sanitized = raw; // ✅ 仍然可以赋值，TS 认为它们都是 string
```
虽然 `UserInputSanitizedString` 和 `RawInputString` 看起来是两种不同的类型，但 **TypeScript 认为它们都只是 `string`**，所以可以互相赋值。

---

### ❸ **如何让 TypeScript 真的区分两个类型？**
如果你想让 `UserInputSanitizedString` 变成真正和 `string` **不同** 的类型，可以使用 **品牌化（Branding）** 技术：
```ts
type UserInputSanitizedString = string & { readonly __brand: unique symbol };

function sanitizeInput(str: string): UserInputSanitizedString {
  return str as UserInputSanitizedString;
}

let userInput = sanitizeInput(getInput());

userInput = "new input"; // ❌ TypeScript 报错，因为 "new input" 不是 UserInputSanitizedString
```
**这次 TypeScript 真的把 `UserInputSanitizedString` 当成一个独立的类型了！**  
因为 `string & { readonly __brand: unique symbol }` 让 `UserInputSanitizedString` 变成了 `string` **的子类型**，但不是普通的 `string`。

---

### **总结**
> **类型别名（Type Alias）不会创建新的类型，它只是一个名字（alias），本质上仍然是原类型。**  
> **如果你想创造真正不同的类型，需要用品牌化（Branding）技术。**
