const decompress = require('decompress');
const fs = require('fs'); 

async function unzip(archive) {
    try {
        await decompress(`${archive}.zip`, __dirname).then(files => {
            console.log('### Extraido ###');
        })
    } catch (err) {

        console.log(err)
        
    }
}


module.exports = {unzip}
