const request = require('request');
const fs = require('fs');
const decompress = require('decompress');
const { exec } = require('child_process');
// const readline = require("readline");
// const { RSA_X931_PADDING } = require('constants');
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });


let file;
let url;
const runtime = "Runtime"
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
    const file_name = service
    let received_bytes = 0;
    let total_bytes = 0;
    const file_url = "https://www.insidesistemas.com.br/atualizaservice.zip"
    const targetPath = `C:\\Users\\silvio.galvao\\Desktop\\atualizador\\${file_name}.zip`
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
        setTimeout(function () { unzip(file_name) }, 1300);
        setTimeout(function () { // FUNÇÃO RENOMEAR ARQUIVO
            fs.rename(file_name + '.exe', `${file_name}_${rename()}.exe`, function () {
                console.log('### Renomeado ###')
            })
        }, 3400)
        setTimeout(function () { fs.unlinkSync(`${file_name}.zip`) }, 5000) // DELETANDO ARQUIVO .ZIP
        setTimeout(function () { execute(file_name) }, 5000);

    });

}


    // PROGRESSO DO DOWNLOAD
function progressBar(received, total) {
    let percentage = (received * 100) / total;
    console.log(Math.floor(percentage) + "% | " + received + " bytes out of " + total + " bytes.");
}



    // EXTRAINDO ARQUIVO
async function unzip(archive) {
    try {
        await decompress(`${archive}.zip`, __dirname).then(files => {
            console.log('### Extraido ###');
        })
    } catch (err) {

        return console.log("error")
    }
}


    // EXECUTAR ARQUIVO
let execute = function (archive) {
    
    console.log("### Executando aplicativo ###");
    exec(`${archive}_${rename()}.exe`, function (err) {
        // console.log(err) 
        console.log("### Concluído ###");
    });
}
    // RENOMEANDO BASEADO NA DATA
function rename() {
    const renamed = dia + "" + mes() + "" + ano;
    return renamed

}




// rl.question("Qual ferramenta deseja baixar? ", function(file_name) {
//         if (file_name === 'service'){
//             file = 'https://www.insidesistemas.com.br/atualizaservice.zip'
//             url = service
//         }
//        else if (file_name === 'runtime'){
//             file = 'https://www.insidesistemas.com.br/runtime.zip'
//             url = runtime
//         }
//         else if(file_name=== 'nfse'){
//             file = 'https://www.insidesistemas.com.br/nfse.zip'
//             url = nfse
//         }
//             updateFile(file, url)

//         return console.log("Baixando o Arquivo da ferramenta:", url)
            
            
        
//     ;
// });

// rl.on("close", function() {
//     process.exit(0);
// });
