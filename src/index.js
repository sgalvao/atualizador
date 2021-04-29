const progressBar = document.querySelector(".progress-bar");
let progressComplete = progressBar.getAttribute("data-complete");
const start = document.querySelector(".updateBtn");
const lastUpdate = document.querySelector(".updateDate")


start.addEventListener("click", clickEvent);
async function  clickEvent() {

  const response = await fetch('http://localhost:3333/execute', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      file: file_name
    })})




  //   console.log("entrei")
  //   start.style.background = "#ccc";
  //   let width = 0;
  //   progressComplete = 100;
  //   lastUpdate.remove()
  //   start.disabled = true;
  //   const count = setInterval(() => {
  //     if (width != progressComplete) {
  //       width++;
  //       progressBar.style.opacity = "1";
  //       progressBar.style.width = width + "%";
  //       progressBar.innerHTML = width + "%";
  //     } else {
  //       clearInterval(count);
  //       start.style.background = '';
  //       start.disabled = false;
        
  //     }
  // }, 30);
}
