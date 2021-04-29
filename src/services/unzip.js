const decompress = require('decompress');


async function unzip(archive) {
    try {
        await decompress(`${archive}.zip`, __dirname).then(files => {
            console.log('### Extraido ###');
        })
    } catch (err) {

        return console.log("error")
    }
}