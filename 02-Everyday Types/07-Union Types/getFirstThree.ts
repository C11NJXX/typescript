function getFirstThree(
    sentence:
        | number[]
        | string
) {
    console.log(sentence.slice(0, 3));
}

getFirstThree([1, 2, 3, 4, 5]);
getFirstThree('12345');