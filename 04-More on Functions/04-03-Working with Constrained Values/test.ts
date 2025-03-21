function minimumLength<Type extends { length: number }>(
    obj: Type,
    minimum: number
): Type {
    if (obj.length >= minimum) {
        return obj;
    } else {
        //Type 约束了 { length: number }，但 { length: number } 本身并不一定符合 Type，因为 Type 可能有更多的属性。
        //⚠️ 注意：这只是让 TypeScript 忽略 类型检查，可能会导致运行时错误，除非你确定 Type 没有额外的必须属性。
        return { length: minimum } as Type;
    }
}

const arr = minimumLength([1, 2, 3], 6);
// TypeError: arr.slice is not a function
// arr.slice(0);