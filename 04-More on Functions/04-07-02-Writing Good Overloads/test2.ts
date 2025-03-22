function len(x: any[] | string) {
    return x.length;
}

len(""); // OK
len([0]); // OK
len(Math.random() > 0.5 ? "hello" : [0]);

/**
 * Always prefer parameters with union types instead of overloads when possible
 * 尽可能优先选择联合类型的参数，而不是重载
 */