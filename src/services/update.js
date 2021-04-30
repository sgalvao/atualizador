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
app.get('/update', (req,res) => {

   return res.send(updateFile())
})

const httpServer = createServer(app)
const socketServer = new Server(httpServer)



httpServer.listen(3333, () => {
    console.log('Running...😊')

})

socketServer.on('connect',() =>{
    console.log("connected")
})


const runtime = "Runtime"
const service = "Setup"
const nfse = "Setup_ServiceNFSe"


    // DOWNLOAD FUNCTION
function updateFile() {
    const file_name = runtime
    let received_bytes = 0;
    let total_bytes = 0;
    const file_url = "http://www.insidesistemas.com.br/runtime.zip"
    const targetPath = `C:\\Users\\silvi\\Desktop\\atualizador\\${file_name}.zip`
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

    req.on('end', async function () {
        unzip(file_name).then()
         fs.rename(file_name + '.exe', `${file_name}_${rename()}.exe`)
         fs.unlinkSync(`${file_name}.zip`)
         execute(file_name)

    });

}

function progressBar(received, total) {
    let percentage = (received * 100) / total;
    socketServer.emit('update-chunk', Math.ceil(percentage))
    console.log(percentage)
}



module.exports = {updateFile}