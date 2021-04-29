

function progressBar(received, total) {
    let percentage = (received * 100) / total;
    console.log(Math.floor(percentage) + "% | " + received + " bytes out of " + total + " bytes.");
}