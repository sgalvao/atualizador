const request = require('request');
const fs = require('fs');
const decompress = require('decompress');
const { exec } = require('child_process');


const service = "Setup"
const nfse = "Setup_ServiceNFSe"
const data = new Date();
const ano = data.getFullYear();
const mes = () => {
    let correctMonth = data.getMonth() + 1;
    if(correctMonth < 10){ correctMonth = "0"+ correctMonth}
    return correctMonth
}
const dia = data.getDate();

    // DOWNLOAD FUNCTION
function updateFile() {
    let received_bytes = 0;
    let total_bytes = 0;
    const file_url = "https://www.insidesistemas.com.br/nfse.zip"
    const targetPath = "C:\\Users\\silvio.galvao\\Desktop\\atualizador\\unzipme.zip"
    let req = request({
        method: 'GET',
        uri: file_url,
    });

    let out = fs.createWriteStream(targetPath);
    req.pipe(out);

    req.on('response', function (data) {

        total_bytes = parseInt(data.headers['content-length']);
    });

    req.on('data', function (chunk) {

        received_bytes += chunk.length;

        progressBar(received_bytes, total_bytes);
    });

    req.on('end', function () {
        setTimeout(function () { unzip() }, 2000);
        setTimeout(function () { // FUNÇÃO RENOMEAR ARQUIVO
            fs.rename(nfse + '.exe', `${nfse}_${rename()}.exe`, function () {
                console.log('### Renomeado ###')
            })
        }, 2600)
        setTimeout(function () { execute() }, 5000);
        setTimeout(function () { fs.unlinkSync('./unzipme.zip') }, 2000) // DELETANDO ARQUIVO .ZIP

    });

}


    // PROGRESSO DO DOWNLOAD
function progressBar(received, total) {
    let percentage = (received * 100) / total;
    console.log(Math.floor(percentage) + "% | " + received + " bytes out of " + total + " bytes.");
}



    // EXTRAINDO ARQUIVO
async function unzip() {
    try {
        await decompress('unzipme.zip', __dirname).then(files => {
            console.log('### Extraido ###');
        })
    } catch (err) {

        return console.log("error")
    }
}


    // EXECUTAR ARQUIVO
let execute = function () {
    console.log("### Executando aplicativo ###");
    exec(`${nfse}_${rename()}.exe`, function (err) {
        // console.log(err) test 
        console.log("### Concluído ###");
    });
}
    // RENOMEANDO BASEADO NA DATA
function rename() {
    const renamed = dia + "" + mes() + "" + ano;
    return renamed

}

updateFile()
