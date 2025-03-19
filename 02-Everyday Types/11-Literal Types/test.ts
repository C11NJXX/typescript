let letString = 'You can modify me';
const constSting = "You can't modify me";

console.log(typeof letString);
console.log(typeof constSting);

let x: "Literal Type" = "Literal Type";
x = "Literal Type"; //ok
//x = "Why I can't reassign???" //不能将类型“"Why I can't reassign???"”分配给类型“"Literal Type"”。ts(2322)