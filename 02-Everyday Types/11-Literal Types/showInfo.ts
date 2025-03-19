interface Default {
    work: string;
}
function showInfo(user: Default | 'Admin') {
    console.log(user);
}

showInfo('Admin');
showInfo({ work: 'User' })