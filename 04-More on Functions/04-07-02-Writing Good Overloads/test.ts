//•	len(s: string): number; 只能接受 string 类型的参数。
function len(s: string): number;
//•	len(arr: any[]): number; 只能接受 any[]（数组类型）。
function len(arr: any[]): number;

function len(x: string | any[]): number;
//•	函数实现 len(x: any) 采用了 any，但它对外部不可见（TypeScript 仅使用重载签名进行类型检查）。
// function len(x: any) {
//     return x.length;
// }

function len(x: string | any[]) {
    return x.length;
}

len(""); // OK
len([0]); // OK

//	•	Math.random() > 0.5 有 50% 概率返回 "hello"，50% 概率返回 [0]。
//	•	TypeScript 无法确定参数的具体类型，所以它推断 x 的类型为 string | any[]。
//	•	但是你的重载签名没有定义 len(x: string | any[])，所以 TypeScript 认为 len 不能接受 string | any[] 类型，从而报错。
// len(Math.random() > 0.5 ? "hello" : [0]);

len(Math.random() > 0.5 ? "hello" : [0])