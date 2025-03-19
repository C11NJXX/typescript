```ts
您可能不会在字典中找到“真实性”这个词，但是您在 JavaScript 中经常会听到它。

在 JavaScript 中，
我们可以在条件语句、 && 、 || 、 if语句、布尔否定 ( ! ) 等中使用任何表达式。
例如， if语句并不期望其条件始终具有boolean类型。

function getUsersOnlineMessage(numUsersOnline: number) {
  if (numUsersOnline) {
    return `There are ${numUsersOnline} online now!`;
  }
  return "Nobody's here. :(";
}


在 JavaScript 中，像if的结构首先将其条件“强制”为boolean值以使其有意义，
然后根据结果是true还是false选择它们的分支。

值如下
0
NaN
"" (the empty string)
0n (the bigint version of zero)
null
undefined

所有值都强制转换为false ，其他值强制转换为true 。
你始终可以通过Boolean函数或使用更短的双布尔否定将值强制转换为boolean 。
后者的优点是 TypeScript 推断出窄文字布尔类型true ，而将第一个推断为boolean类型。）

// both of these result in 'true'
Boolean("hello"); // type: boolean, value: true
!!"world"; // type: true,    value: true
//This kind of expression is always truthy.

利用这种行为相当流行，尤其是为了防止null或undefined类的值。
作为示例，让我们尝试将其用于printAll函数。

function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}
您会注意到，我们通过检查strs是否为真来消除上述错误。
这至少可以防止我们在运行代码时出现可怕的错误，例如：

但请记住，对原语的真实性检查通常容易出错。例如，考虑尝试编写printAll

function printAll(strs: string | string[] | null) {
  // !!!!!!!!!!!!!!!!
  //  DON'T DO THIS!
  //   KEEP READING
  // !!!!!!!!!!!!!!!!
  if (strs) {
    if (typeof strs === "object") {
      for (const s of strs) {
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    }
  }
}

TypeScript 在这方面对我们没有任何影响，但如果你不太熟悉 JavaScript，这种行为值得注意。
TypeScript 通常可以帮助你尽早发现错误，
但如果你选择对值不做任何处理，它能做的事情就很有限，而且不会过于规范。
如果你愿意，你可以确保使用 linter 来处理类似这种情况。

关于按真实性缩小范围的最后一点说明，带有!的布尔否定会从否定分支中过滤掉。

function multiplyAll(
  values: number[] | undefined,
  factor: number
): number[] | undefined {
  if (!values) {
    return values;
  } else {
    return values.map((x) => x * factor);
  }
}
```