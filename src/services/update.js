const rename = require('./rename')
const execute = require('./execute')
const unzip = require('./unzip')
const request = require('request');
const fs = require('fs'); 
const express = require('express');
const cors = require('cors');
const app = express();
const {Socket, Server} = require('socket.io')
const {createServer} = require('http')



app.use(express.json())
app.use(cors())
app.post('/update', (req,res) => {
const {file} = req.body;
   return res.send(sendFunc(file))
})

const httpServer = createServer(app)
const socketServer = new Server(httpServer)



httpServer.listen(3333, () => {
    console.log('Running...😜')

})

socketServer.on('connect',() =>{
    console.log("connected")
})




const sendFunc = (file_name) =>{
    let file;
    let url;

    if (file_name === 'service'){
        file = 'Setup'
        url = 'https://www.insidesistemas.com.br/atualizaservice.zip'
    }
    if (file_name === 'runtime'){
        file ='Runtime'
        url = 'https://www.insidesistemas.com.br/runtime.zip'
    }
    if (file_name === 'nfse'){
        file = 'Setup_ServiceNFSe'
        url = 'http://www.insidesistemas.com.br/nfse.zip'
    }

    updateFile(file, url)
}





    // DOWNLOAD FUNCTION
function updateFile(file, url) {

    let received_bytes = 0;
    let total_bytes = 0;
    const targetPath =(__dirname,`${file}.zip`)
    let req = request({
        method: 'GET',
        uri: url,
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

    req.on('end', async function () {
        try{
            await unzip(file)
            await fs.rename(`C:\\${file}.exe`, `C:\\${file}_${rename()}.exe`, ()=>{})
            await fs.unlinkSync(targetPath)
            await execute(file)

        }
        catch(err){

           return ErrorEvent({error : "falha na execução. ", err})

        }

    });

}

function progressBar(received, total) {
    let percentage = (received * 100) / total;
    socketServer.emit('update-chunk', Math.floor(percentage))
    // console.log(percentage)
}
