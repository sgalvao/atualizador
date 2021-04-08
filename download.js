const request = require('request');
const fs = require('fs');
const decompress = require('decompress');
const { exec } = require('child_process');

function downloadFile() {
    var received_bytes = 0;
    var total_bytes = 0;
    const file_url = ""
    const targetPath = ""
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

        showProgress(received_bytes, total_bytes);
    });

    req.on('end', function() {
        setTimeout(function(){ unzip() }, 2000);
        setTimeout(function(){ execute() }, 5000);
        
    });

   
}

function showProgress(received,total){
    var percentage = (received * 100) / total;
    console.log(Math.floor(percentage) + "% | " + received + " bytes out of " + total + " bytes.");
}

async function unzip(){
    try{
      await decompress('unzipme.zip', __dirname).then(files => {
      console.log('done!');
    })
    } catch(err){
    
      return console.log("error")
    } 
}

var execute = function(){
    console.log("Executando");
    exec("Setup.exe", function(err, data) {  
         console.log(err)
         console.log("###Concluído!!###");                       
     });
 }
 


downloadFile()
