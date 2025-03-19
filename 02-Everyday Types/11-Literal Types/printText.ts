/* only print known texts */
function printText(
    text:
        | 'Right'
        | 'Left'
) {
    console.log(`Turn ${text}`);
}

printText('Left');
printText('Right');

//类型“"Lfet"”的参数不能赋给类型“"Right" | "Left"”的参数。ts(2345)
//printText('Lfet');