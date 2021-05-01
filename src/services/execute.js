const rename = require('./rename')
const { exec } = require('child_process');

module.exports = function execute (archive) {
    
    console.log("### Executando aplicativo ###");
    exec( `C:\\${archive}_${rename()}.exe`, function (err) {
        // console.log(err) 
        // console.log("### Concluído ###");
    });
}
    // RENOMEANDO BASEADO NA DATA

 
    



    
