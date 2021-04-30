const rename = require('./rename')
const { exec } = require('child_process');

let execute = function (archive) {
    
    console.log("### Executando aplicativo ###");
    exec(`${archive}_${rename()}.exe`, function (err) {
        // console.log(err) 
        console.log("### Concluído ###");
    });
}
    // RENOMEANDO BASEADO NA DATA

module.exports =  {execute}