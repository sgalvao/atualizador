const decompress = require('decompress');
const fs = require('fs'); 

module.exports = async function unzip(archive) {
    try {
        await decompress(`${archive}.zip`, "\\").then(files => {
            console.log('### Extraido ###');
        })
    } catch (err) {

        console.log(err)
        
    }
}
