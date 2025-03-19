```ts
JavaScript 有一个运算符，用于确定对象或其原​​型链是否具有带名称的属性： in运算符。
TypeScript 会考虑到这一点，以缩小潜在类型的范围。

例如，代码为： "value" in x . 其中"value"是字符串文字，而x是联合类型。
 “true” 分支将x的类型缩小为具有可选或必需属性value ，
 而 “false” 分支将 x 的类型缩小为具有可选或缺失属性value 

type Fish = { swim: () => void };
type Bird = { fly: () => void };
 
function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }
 
  return animal.fly();
}

重申一下，可选属性将存在于两侧以缩小范围。
例如，人类既可以游泳又可以飞行（使用正确的设备），因此应该出现在in的两侧：

type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Human = { swim?: () => void; fly?: () => void };
 
function move(animal: Fish | Bird | Human) {
  if ("swim" in animal) {
    animal;
      
(parameter) animal: Fish | Human
  } else {
    animal;
      
(parameter) animal: Bird | Human
  }
}


```