

function rename() {
    const data = new Date();
    const ano = data.getFullYear();
    let dia = data.getDate();
    const mes = () => {
    let correctMonth = data.getMonth() + 1;
    if(correctMonth < 10){ correctMonth = "0"+ correctMonth}
    return correctMonth
}

    const renamed = dia + "" + mes() + "" + ano;
    return renamed

}

module.exports = {rename}