const decompress = require('decompress');
const fs = require('fs'); 

module.exports = async function unzip(archive) {
    try {
        await decompress(`${archive}.zip`, "C:").then(files => {
            console.log('### Extraido ###');
        })
    } catch (err) {

        console.log(err)
        
    }
}
