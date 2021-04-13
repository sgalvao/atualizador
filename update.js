const request = require('request');
const fs = require('fs');
const decompress = require('decompress');
const { exec } = require('child_process');

const data = new Date()

function updateFile() {
    var received_bytes = 0;
    var total_bytes = 0;
    const file_url = "https://www.insidesistemas.com.br/nfse.zip"
    const targetPath = "C:\\Users\\silvi\\Desktop\\atualizadorfinal\\unzipme.zip"
    var req = request({
        method: 'GET',
        uri: file_url,
    });

    var out = fs.createWriteStream(targetPath);
    req.pipe(out);

    req.on('response', function ( data ) {
      
        total_bytes = parseInt(data.headers['content-length' ]);
    });

    req.on('data', function(chunk) {
        
        received_bytes += chunk.length;

        progressBar(received_bytes, total_bytes);
    });

    req.on('end', function() {
        setTimeout(function(){ unzip() }, 2000);
        setTimeout(function(){fs.rename('Setup_ServiceNFSe.exe', 'unziped.exe', function (){
            console.log('executei')
        })}, 3000)
        setTimeout(function(){
            fs.unlinkSync('./unzipme.zip')
            console.log('### Deletando Zip ###')
            },2000)
        setTimeout(function(){ execute() }, 5000);

    });

   
}

function progressBar(received,total){
    var percentage = (received * 100) / total;
    console.log(Math.floor(percentage) + "% | " + received + " bytes out of " + total + " bytes.");
}

async function unzip(){
    try{
      await decompress('unzipme.zip', __dirname).then(files => {
      console.log('### Extraido ###');
    })
    } catch(err){
    
      return console.log(err)
    } 
}

var execute = function(){
    console.log("### Executando aplicativo ###");
    exec("unziped.exe", function(err,data) {  
         console.log(data,"### Concluído ###");
         console.log(err)                       
     });
    
     
 }
 


updateFile()
