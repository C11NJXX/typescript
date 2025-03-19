function welcome(
    person:
        | string[]
        | string
) {
    if (Array.isArray(person)) {
        console.log(`Welcome ${person.join(' ')}`);
    } else {
        console.log(`Welcome ${person}`)
    }
}

welcome(['Bob', 'John']);
welcome('Alice');