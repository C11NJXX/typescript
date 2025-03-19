interface Person {
    name: string;
    age: number;
}

function showInfo(person: Person) {
    console.log(`Your name is ${person.name} and your age is ${person.age}`)
}

showInfo({ name: 'C_11nJxx', age: 20 });