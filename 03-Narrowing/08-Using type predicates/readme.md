```ts

到目前为止，我们已经使用现有的 JavaScript 构造来处理缩小范围，
但有时您希望更直接地控制类型在整个代码中的变化方式。

要定义用户定义的类型保护，我们只需定义一个返回类型为类型谓词的函数：

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

A predicate takes the form parameterName is Type

在本例中， pet is Fish是我们的类型谓词。
谓词采用以下形式parameterName is Type
其中,parameterName必须是当前函数签名中参数的名称。

任何时候使用某个变量调用isFish时，如果原始类型兼容，TypeScript 会将该变量缩小到该特定类型。

// Both calls to 'swim' and 'fly' are now okay.
let pet = getSmallPet();
 
if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}

请注意，TypeScript 不仅知道if分支中pet是Fish ；它还知道在else分支中没有Fish ，因此一定是Bird 。

您可以使用类型保护isFish来过滤Fish | Bird数组并获取Fish数组：

const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter(isFish) as Fish[];
 
// The predicate may need repeating for more complex examples
const underWater3: Fish[] = zoo.filter((pet): pet is Fish => {
  if (pet.name === "sharkey") return false;
  return isFish(pet);
});

此外，类可以使用this is Type来缩小其类型。
```