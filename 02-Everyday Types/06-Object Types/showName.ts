function showInfo(name: { first: string, last?: string }) {
    const firstName = (name.first.split('')[0].toUpperCase()).concat(name.first.slice(1));
    //const lastName = (name.last.split('')[0].toUpperCase()).concat(name.last.slice(1)); //“name.last”可能为“未定义”。ts(18048)
    const lastName = (name.last?.split('')[0].toUpperCase())?.concat(name.last.slice(1));
    const fullName = firstName+lastName;
    console.log(`Hi ${fullName}`);
}

showInfo({first:"rudy",last:"james"});