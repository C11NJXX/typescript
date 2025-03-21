type FN = (id: string) => void;

function showId(fn: FN) {
    fn('1220');
}

showId((s: string) => {
    console.log(s);
})