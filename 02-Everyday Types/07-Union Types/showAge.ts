function showAge(age: string | number) {
    console.log(`You are ${age} years old`);
}

showAge(18);
showAge("18");
//showAge({age:18}); //类型“{ age: number; }”的参数不能赋给类型“string | number”的参数。ts(2345)

function showAge2(
    age:
        | string
        | number
) {
    console.log(`You are ${age} years old`);
};

showAge(18);
showAge("18");