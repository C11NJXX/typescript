function liveDangerously(x?: number | null) {

    //x可能为 “null” 或“未定义”。ts(18049)
    //console.log(x.toFixed(1));

    // No error
    console.log(x!.toFixed(1));
}

liveDangerously();