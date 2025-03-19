type Age = number | string;

function showAge(age: Age) {
    console.log(`You are ${age} years old`);
}

showAge(18);
showAge('18');