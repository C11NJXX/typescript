function showId(
    id:
        | number
        | string
) {
    if(typeof id === 'string') {
        console.log(`Your id is ${id.toUpperCase()}`);
    }else {
        console.log(`Your id is ${id}`);
    }
}

showId('adasd')
showId(123);