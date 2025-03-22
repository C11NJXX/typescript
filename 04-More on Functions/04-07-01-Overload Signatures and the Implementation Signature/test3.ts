function fn(x: string): string;
// Return type isn't right
function fn(x: number): boolean;

function fn(x: string | number) {
    if (typeof x === 'string') {
        return x;
    } else {
        return x > 0;
    }
}