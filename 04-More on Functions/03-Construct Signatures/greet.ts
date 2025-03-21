interface CallOrConstruct {
    (name?: string): void;
    new(s?: string): Date
}

function showName(name?: string) {
    console.log(`Hi ${name === undefined ? 'default' : name}`);
}

function greet(fn: CallOrConstruct) {
    fn('C_11nJxx');
    console.log(`Today is ${new fn()}`)
}

greet(Date);