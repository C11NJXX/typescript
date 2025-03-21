function firstElement<Type>(arr: Type[]): Type | undefined {
    return arr[0];
}

console.log(typeof firstElement('123'.split('')));
console.log(typeof firstElement([1, 2, 3]));